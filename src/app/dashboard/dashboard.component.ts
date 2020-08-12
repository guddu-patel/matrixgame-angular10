import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  angForm: FormGroup;
  matrix:any[][];
  current=null;
  totalFood=0;
  totalStep=0;
  gameover=false;
  constructor( private fb:FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.angForm = this.fb.group({
       rows: ['', [Validators.required,Validators.min(2)] ],
       cols: ['', [Validators.required,Validators.min(2)] ]
    });
  }
  resetgame(){
    this.totalFood=0;
    this.totalStep=0;
    // this.angForm.reset();
    // this.matrix=null;
    this.gameover=false;
    this.generatematrix()
  }
  goback(){
    this.angForm.reset();
    this.matrix=null;
  }
  generatematrix(){
    this.totalFood=0;
    this.totalStep=0;
    this.gameover=false;
    this.current=[Math.ceil(this.angForm.value.rows/2),Math.ceil(this.angForm.value.cols/2)];
    this.matrix = [];
    for (let i = 0; i < this.angForm.value.rows; i++) {
      this.matrix.push(new Array(this.angForm.value.cols));
    }
    // console.log(this.matrix);

    for (let row = 0; row < this.angForm.value.rows; row++) {
      // this.matrix=[this.angForm.value.rows];
      for (let col = 0; col < this.angForm.value.cols; col++) {
        // this.matrix[row]=[this.angForm.value.cols];
        this.matrix[row][col]={current:false,hasfood:false}
      }
    }
    this.matrix[this.current[0]][this.current[1]].current=true;
    
    for (let row = 0; row < this.angForm.value.rows; row++) {
      let rrand=Math.floor(Math.random() * Math.floor(this.angForm.value.rows));
      let crand=Math.floor(Math.random() * Math.floor(this.angForm.value.cols));
      console.log(rrand+','+crand);
      if(!this.matrix[rrand][crand].hasfood && !(rrand==this.current[0] && crand ==this.current[1])){
        this.matrix[rrand][crand].hasfood=true;
        this.totalFood++;
      }
    }
    console.log(this.matrix);
    console.log(this.current);
    console.log("total food",this.totalFood);
    // console.log(this.angForm.value.rows+','+this.angForm.value.cols);
  }
  Move(key){
    console.log(key);
    if(this.gameover) return;
    switch (key) {
      case "ArrowLeft":
          if(this.current[1] > 0){
            this.matrix[this.current[0]][this.current[1]].current=false;
            this.current[1]--;
            this.matrix[this.current[0]][this.current[1]].current=true;
            this.updateStepCount();
          }
          break;
      case "ArrowRight":
        if(this.current[1] < this.angForm.value.cols-1){
          this.matrix[this.current[0]][this.current[1]].current=false;
          this.current[1]++;
          this.matrix[this.current[0]][this.current[1]].current=true;
          this.updateStepCount();
        }
          break;
      case "ArrowUp":
        if(this.current[0] > 0){
          this.matrix[this.current[0]][this.current[1]].current=false;
          this.current[0]--;
          this.matrix[this.current[0]][this.current[1]].current=true;
          this.updateStepCount();

        }
          break;
      case "ArrowDown":
        if(this.current[0] < this.angForm.value.rows-1){
          this.matrix[this.current[0]][this.current[1]].current=false;
          this.current[0]++;
          this.matrix[this.current[0]][this.current[1]].current=true;
          this.updateStepCount();

        }
          break;
  }
  }
  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.Move(event.key);
  }
  updateFoodCount(){
    if(this.matrix[this.current[0]][this.current[1]].hasfood){
      this.totalFood--;
      this.matrix[this.current[0]][this.current[1]].hasfood=false;
    }
    if(this.totalFood==0){
      this.gameover=true;
      console.log('gameover you had all food in '+this.totalStep+"steps");
    }
  }
  updateStepCount(){
    this.totalStep++;
    this.updateFoodCount();

  }
}

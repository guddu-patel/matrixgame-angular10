import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('ArrowUp') ArrowUp: ElementRef;
  @ViewChild('ArrowLeft') ArrowLeft: ElementRef;
  @ViewChild('ArrowRight') ArrowRight: ElementRef;
  @ViewChild('ArrowDown') ArrowDown: ElementRef;
  angForm: FormGroup;
  matrix:any[][];
  current=null;
  totalFood=0;
  totalFoodOriginal=0;
  totalStep=0;
  gameover=false;
  bestScoreMade=false;
  userScore:any;
  constructor( private fb:FormBuilder) { 
    this.userScore={};
    this.createForm();
  }

  ngOnInit(): void {
    
    this.userScore=JSON.parse(sessionStorage.getItem('score'))||{};
    console.log('score:',this.userScore);
    console.log(this.userScore.length)
  }
  createForm() {
    this.angForm = this.fb.group({
       rows: [5, [Validators.required,Validators.min(2)] ],
       cols: [5, [Validators.required,Validators.min(2)] ]
    });
  }
  resetgame(){
    this.totalFood=0;
    this.totalStep=0;
    // this.angForm.reset();
    // this.matrix=null;
    this.gameover=false;
    this.bestScoreMade=false;
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
    this.totalFoodOriginal=this.totalFood;
    console.log(this.matrix);
    console.log(this.current);
    console.log("total food",this.totalFood);
    // this.userScore[this.totalFoodOriginal]={'best':this.userScore[this.totalFoodOriginal]||0,current:0};
    // console.log(this.angForm.value.rows+','+this.angForm.value.cols);
  }
  Move(key){
    console.log(key);
    // return;
    if(this.gameover) return;
    switch (key) {
      case "ArrowLeft":
          if(this.current[1] > 0){
            this.matrix[this.current[0]][this.current[1]].current=false;
            this.current[1]--;
            this.matrix[this.current[0]][this.current[1]].current=true;
            this.updateStepCount(this.ArrowLeft);
          }
          break;
      case "ArrowRight":
        if(this.current[1] < this.angForm.value.cols-1){
          this.matrix[this.current[0]][this.current[1]].current=false;
          this.current[1]++;
          this.matrix[this.current[0]][this.current[1]].current=true;
          this.updateStepCount(this.ArrowRight);
        }
          break;
      case "ArrowUp":
        if(this.current[0] > 0){
          this.matrix[this.current[0]][this.current[1]].current=false;
          this.current[0]--;
          this.matrix[this.current[0]][this.current[1]].current=true;
          this.updateStepCount(this.ArrowUp);

        }
          break;
      case "ArrowDown":
        if(this.current[0] < this.angForm.value.rows-1){
          this.matrix[this.current[0]][this.current[1]].current=false;
          this.current[0]++;
          this.matrix[this.current[0]][this.current[1]].current=true;
          this.updateStepCount(this.ArrowDown);

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
      this.updateBestScore();
    }
  }
  updateBestScore(){
    let BS=0;
    if(this.userScore[this.totalFoodOriginal] && this.userScore[this.totalFoodOriginal].best<=this.totalStep) {
      BS=this.userScore[this.totalFoodOriginal].best;
    }
    else{
    BS=this.totalStep;
    this.bestScoreMade=true;
  }
    this.userScore[this.totalFoodOriginal]={'best':BS,'current':this.totalStep};
    
      sessionStorage.setItem('score',JSON.stringify(this.userScore));
  }
  updateStepCount(key){
    this.highlightkey(key);
    this.totalStep++;
    this.updateFoodCount();
  }
  highlightkey(key){
    debugger
    key.nativeElement.classList.add('btnClick');
    setTimeout(()=>{
      key.nativeElement.classList.remove('btnClick');
    },150)
  }
}

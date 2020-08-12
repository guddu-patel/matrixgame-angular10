import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoname:any='';
  todos:any;
  id=0;
  seletedItem=null;
  constructor() { }

  
  ngOnInit(): void {
    this.todos=[];
  }
  addEditItem(){
    if(this.seletedItem)
      this.updateItem();
      else
      this.addItem();
  }
  addItem(){
    if(this.todoname){
    this.todos.push({name:this.todoname,id:this.id});
    this.todoname="";
    this.id++;
  }
  }
  deleteItem(id){
    debugger;
    this.todos =  this.todos.filter(function(itm) {
      return itm.id != id;
    });
  }
  edit(data){
    this.seletedItem=data;
    this.todoname=data.name;
  }
  updateItem(){
    debugger;
    // let that=this;
    this.todos =  this.todos.filter((itm) =>{
      if( itm.id == this.seletedItem.id)
        itm.name=this.todoname;
        return true;
    });
    this.seletedItem=null;
    this.todoname="";
  }
}

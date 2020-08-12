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
  addEditItem(f){
    if(this.seletedItem)
      this.updateItem(f);
      else
      this.addItem(f);
  }
  addItem(form){
    if(this.todoname){
    this.todos.push({name:this.todoname,id:this.id});
    // this.todoname="";
    this.id++;
    form.resetForm();
    debugger;
    // form.markAsPristine();
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
  updateItem(form){
    debugger;
    // let that=this;
    this.todos =  this.todos.filter((itm) =>{
      if( itm.id == this.seletedItem.id)
        itm.name=this.todoname;
        return true;
    });
    this.seletedItem=null;
    // this.todoname="";
    form.resetForm();

  }
}

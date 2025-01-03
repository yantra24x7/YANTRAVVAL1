import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavbarService} from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
import {ProgramListService} from '../../Service/app/programlist.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class MasterComponent implements OnInit {
  date: any;
  myLoader = false;
  startDate = new Date(2020, 0, 1);

  masterate:any;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
      - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
      ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  data:string;   
  machine_response: any;
  tenant: any;
  reason: any;
  length:any;
  machine_id:any;
  slavate:any;
  user:any;
  add_value:any;
  // id:any;
  constructor(private http: HttpClient,private fb:FormBuilder,public dialog: MatDialog,private nav:NavbarService,private service:ProgramListService) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
    // this.id = localStorage.getItem('machine_id')
    this.user = localStorage.getItem('user_id')


   }
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
   dataSource=new MatTableDataSource
   slave=new MatTableDataSource

   slavelist: string[] = ['position', 'name', 'weight', 'symbol','action'];
  
  openDialog(machine): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      data: { edit_shift: machine}

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialog2(id): void {
    const dialogRef = this.dialog.open(Delete, {
      width: '250px',
      data: { machine_id: id}

      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  
  ngOnInit() {
    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.machine_response=res;
      // this.service.filelist( this.machine_response.id).subscribe(res =>{
        this.machine_id = this.machine_response[0].id;
        let data = this.machine_id;

        localStorage.setItem('machine_id',data);
        this.getmachine(this.machine_response[0].id)
      });
   
  }

  upload(demo){

    this.service.cnc_upload(demo,this.machine_id).pipe(untilDestroyed(this)).subscribe(res =>{
      Swal.fire(res.status)
      location.reload()
    })
  }


  new_download(idest,val){

  let scotch ={
      "id": this.machine_id,
      "file_name": idest,
      "user_id": this.user,
      "position": val
    }

    this.service.download(scotch).pipe(untilDestroyed(this)).subscribe(res =>{

 var file = new Blob([res], {
     type: 'text/json;charset=utf-8'
   });

   var data = "text/json;charset=utf-8," + encodeURIComponent(data);
  saveAs(file, scotch.file_name );
      
    
    })
  }

  

  

    

  
  new_sdownload(latest,position){

    let scotch ={
        "id": this.machine_id,
        "file_name":latest,
        "user_id": this.user,
        "position": position
      }
  
      this.service.downloaded(scotch).pipe(untilDestroyed(this)).subscribe(res =>{
        var file = new Blob([res], {
          type: 'text/json;charset=utf-8'
        });
     
        var data = "text/json;charset=utf-8," + encodeURIComponent(data);
       saveAs(file, scotch.file_name );
           
         
         })
       }
       
     

  
  reload() {
    throw new Error("Method not implemented.");
  }

  new_check(val){

    this.service.cnc_receive(val,this.machine_id).pipe(untilDestroyed(this)).subscribe(res =>{
      Swal.fire(res.status)
      location.reload()
    })
  }


  getmachine(id) {
    this.myLoader = true;
     this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader = false;

      this.reason=res;
      this.masterate = res.master_location
      this.slavate =res.slave_location
      this.dataSource=new MatTableDataSource(this.reason)
      this.slave=new MatTableDataSource(this.reason)
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
    })  
  }
 

    

  ngOnDestroy(){

  }


}

@Component({
  selector: 'dialog-page',
  templateUrl: 'dialog.html',
})
export class Dialog {
  test:FormGroup;
  fileName1:any;
  machine_response: any;
  tenant: string;
  file2:any;
  machine_id:any;
  daterangepicker:any;
  value:any;
  status:any;
  add_val:any;
  constructor(private http: HttpClient,public dialogRef: MatDialogRef<Dialog>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:ProgramListService) {
  this.tenant = localStorage.getItem('tenant_id')  
  this.machine_id = localStorage.getItem('machine_id')
  // this.id = localStorage.getItem('machine_id')

  this.value = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fileUpload1(event){ 
    this.file2 = event.target.files[0];
   
    
}
  ngOnInit()
  {
    this.test=this.fb.group ({
      machine_id:[this.value.edit_shift],
      revision_no:["",],

    })

    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.machine_response=res;
      
    });

  }
  
  logintest(){
    this.add_val = this.test.value ;
    this.add_val = this.value.edit_shift;
 

    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      })
    }  
    
    var fd = new FormData();
    fd.append('machine_id', this.test.value.machine_id);
    fd.append('revision_no','1');
    fd.append('file',this.file2);

    this.http.post(`http://${environment.serverUrl1}/api/v1/file_upload`,fd, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).subscribe(res =>{
      
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
      this.dialogRef.close();



    })


   


    
  }
 
   ngOnDestroy(){

  }

}
@Component({
  selector: 'delete-page',
  templateUrl: 'delete.html',
})
export class Delete {
  date: any;
  machine_id:any;
  login:FormGroup;
  add_val: any;  
  startDate = new Date(2020, 0, 1);
  maxDate:any;
  minDate:any;
  value:any;
  // id:any;
  constructor(private service:ProgramListService,public dialogRef: MatDialogRef<Delete>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
    this.machine_id = localStorage.getItem('machine_id')
    // this.id = localStorage.getItem('machine_id')

    this.value = data;
   
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()


  {

    
    this.login = this.fb.group({
      user_name:["",],
      reason:["",],
      date:["",]
    })
  }
  logintest()
  {
    

    this.add_val = this.login.value;
    this.add_val["id"] = this.machine_id;
      this.service.delete(this.login.value).pipe(untilDestroyed(this)).subscribe(res =>{
        if (res['status'] != null) {
          Swal.fire(res['status'])
        }
        this.dialogRef.close();

      })
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
   ngOnDestroy(){

  }

}
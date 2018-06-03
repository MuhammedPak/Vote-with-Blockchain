import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  key: string;
  no: number;
  secilen: string;
  onay: boolean = false;
  oyId: any;
  isVote: any;
  decryptedVote: any;
  decryptKey: any;
  decryptShowed: boolean = false;

  private _TxUrl = "http://localhost:3000/transactions";
  private _voteUrl = "http://localhost:3000/user/update/";
  private _userUrl = "http://localhost:3000/user/";

  constructor(private _auth: AuthService, private http: HttpClient,
    private _router: Router) { }

  ngOnInit() {
    this.user();
    this.isVote = localStorage.getItem('voteStatus');
  }

  isOK(onay) {
    this.onay = onay;
  }
  aday(no) {
    this.no = no;
    if (no == 1) { this.secilen = "Recep Tayyip ERDOĞAN"; }
    else if (no == 2) { this.secilen = "Meral AKŞENER"; }
    else if (no == 3) { this.secilen = "Muharrem İNCE"; }

  }

  vote(key) {
    this.key = key;
    const tc = localStorage.getItem('tc');
    const data = [{ tc: tc }, { vote: this.no }]

    // Encrypt
    const ciphertext = AES.encrypt(JSON.stringify(data), this.key);
    this.oyId = ciphertext.toString();

    const Tx = { code: ciphertext.toString(), vote: this.no.toString() };
    const deger = JSON.stringify(Tx);

    this.http.post(this._TxUrl, deger, httpOptions)
      .subscribe(res => {

        localStorage.setItem('voteStatus', 'true');

        let voteStatus = { voteStatus: localStorage.getItem('voteStatus'), cryptedVote: this.oyId };
        this.http.patch<any>(this._voteUrl + localStorage.getItem('tc'), voteStatus, httpOptions)
          .subscribe(res => {
            this._router.navigate(['/']);
          },
            err => console.log(err)
          );
      },
        (err) => {
          console.log(err);
        });
  }

  user() {
    var tc = localStorage.getItem('tc');
    this.http.get(this._userUrl + tc)
      .subscribe(res => {
        this.oyId = res['user']['cryptedVote'];
      },
        err => console.log(err)
      );
  }

  decrypt(oyId: string) {
    const bytes = AES.decrypt(oyId.toString(), this.decryptKey);
    const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
    let voteValue = decryptedData[1]['vote'];
    this.aday(voteValue);
    this.decryptShowed = true;
  }

}


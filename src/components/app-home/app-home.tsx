import { Component, h, Prop, State } from '@stencil/core';
import { data } from '../../data/sample';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  
  @Prop() db:any;
  @State() lines:any[] = data.lines ? data.lines : [];

  componentDidLoad() {
    if (this.db) {
      // fetch our poem collection
      const poemRef = this.db.collection("poem");

      // listen for changes
      poemRef.onSnapshot((snapshot) => {
        let lines = [];
        snapshot.forEach(doc => {
          lines.push(doc.data());
        })
        this.lines = lines;
      });

      // query our collection
      poemRef.get();
    }
    else {
      console.error(`no database! cannot do it!`);
    }
    
  }

  renderLine(line: any) {
    return (
      <div class="line">{ line.text }</div>
    );
  }

  buttonClicked(event) {
    // grab our line value
    const input = event.composedPath()[1].querySelector('input');
    const line = input.value;
    // add the line to firebase    
    const poemRef = this.db.collection("poem");
    const lineData = { text: line };
    // create an empty document
    const newLineRef = poemRef.doc();
    newLineRef.set(lineData);
  }

  render() {
    return (
      <div class="app-home">
        <div class="poem">
        { 
          this.lines.map((line)=>{
            return this.renderLine(line);
          })
        }
          <div class="line-input">
            <input type="text" placeholder="enter the next line..."></input>
            <button onClick={ this.buttonClicked.bind(this) }>add</button>
          </div>
        </div>
      </div>
    );
  }
}

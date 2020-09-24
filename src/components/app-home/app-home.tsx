import { Component, h, Prop, State } from '@stencil/core';
import { data } from '../../data/sample';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  
  @Prop() db:any;
  @Prop() user:any;
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
        });
        // set sorted lines
        this.lines = lines.sort((a, b)=>{
          if (a.timestamp === undefined) return -1;
          if (a.timestamp > b.timestamp) return 1;
          else if(a.timestamp < b.timestamp) return -1;
          else return 0;          
        });
        console.log(this.lines);
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
    let data = { text: line, timestamp: Date.now() };
    if (this.user) {
      data['uid'] = this.user.uid;
    }
    poemRef.add( data );
  }

  clearClicked(event) {
    console.log(`clear clicked!`);
    // clear our documents
    const poemRef = this.db.collection("poem");
    poemRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
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
        <div class="clear" onClick={ this.clearClicked.bind(this) }>clear poem</div>
      </div>
    );
  }
}

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
    console.log(`i loaded with db:`, this.db);
    
    if (this.db) {
      // fetch our poem
      const poemRef = this.db.collection("poem");
      let dbLines = [];
      poemRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(`i have this line:`, doc.data());
          dbLines.push(doc.data());
        })
        console.log("db lines!", dbLines);
        this.lines = [...this.lines, ...dbLines];
      });
    }
    
  }

  renderLine(line: any) {
    return (
      <div class="line">{ line.text }</div>
    );
  }

  buttonClicked(event) {
    const input = event.path[1].querySelector('input');
    const line = input.value;
    console.log(`got ${line} from:`, input);
    if (line.length > 0) {
      this.lines = [...this.lines, { text:line }];
    }
    console.log(`now I have these lines:`, this.lines);
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

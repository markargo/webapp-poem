import { Component, h } from '@stencil/core';
import { data } from '../../data/sample';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  
  private lines:any[] = data.lines ? data.lines : [];

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
      this.lines.push({ text:line });
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

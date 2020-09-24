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

  render() {
    return (
      <div class="app-home">
        <div class="poem">
        { 
          this.lines.map((line)=>{
            return this.renderLine(line);
          })
        }
        </div>
      </div>
    );
  }
}

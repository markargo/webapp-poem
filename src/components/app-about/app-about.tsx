import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-about',
  styleUrl: 'app-about.css',
  shadow: true,
})
export class AppAbout {
  render() {
    return (
      <div class="app-about">
        <div class="info">
          This is a demo project to learn how to make a very basic web app!
        </div>
      </div>
    );
  }
}

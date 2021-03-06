import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div class="app-root">
        <header>
          <h1>Web App Poem Demo</h1>
          <stencil-route-link url="/about">
            <button>About This</button>
          </stencil-route-link>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/about" component="app-about" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}

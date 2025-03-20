![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

# pwa-music-player

pwa-music-player is a fine-tuned version of [PWAmp](https://microsoftedge.github.io/Demos/pwamp/), serving as a progressive web application (PWA) audio player. This installable web app demonstrates various desktop integration features, allowing users to:

- Add songs  
- Edit song information  
- Apply custom skins  
- Record audio clips  
- Utilize native file handling  
- And more  

## Features

- **Song Management** – Add and edit song details.  
- **Customization** – Apply custom skins to personalize the player.  
- **Audio Recording** – Record and manage audio clips within the app.  
- **Native Integration** – Supports native file handling for a seamless experience.  

## Installation

To install pwa-music-player:

1. Clone the repository:

   ```bash
   git clone https://github.com/bigjohncodes/pwa-music-player.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pwa-music-player
   ```

3. Open `index.html` in your preferred web browser.

For an enhanced experience, install the app as a PWA:

- **On Chrome** – Click the install button in the address bar.  
- **On Edge** – Navigate to the browser menu and select "Apps" > "Install this site as an app".  

## Hosting via GitHub Pages

To make pwa-music-player accessible via GitHub Pages:

1. **Enable GitHub Pages**  
   - Go to your repository on GitHub.  
   - Click on **Settings**.  
   - Under **Code and automation**, go to **Pages**.  
   - In the **Build and deployment** section, choose **Deploy from a branch**.  
   - Select the `main` branch and set the folder to `/root` or `/docs`.  

2. **Disable Jekyll Processing (Optional)**  
   - Add a `.nojekyll` file to the root of your publishing source to bypass Jekyll processing.  

3. **Access Your Site**  
   - Once published, your app will be available at:  
     ```
     https://bigjohncodes.github.io/pwa-music-player/
     ```

For more details, refer to [GitHub Pages Documentation](https://docs.github.com/en/pages).

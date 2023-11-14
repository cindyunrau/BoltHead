<a name="top"></a>

<!-- HEADER -->
<div align="center">
  <img src="images/logo.svg" alt="Logo" width=80px>
  
  # Bolt Head

  [![Milestones][milestones-shield]][milestones-url]
  [![LastCommit][last-commit-shield]][last-commit-url]
  [![Stars][stars-shield]][stars-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]
  
  A 3D WebGL Animation scene containing a chaotic robot 
  <br />

  [View Demo](https://github.com/cindyunrau/bolt-head) •
  [Report Bug](https://github.com/cindyunrau/bolt-head/issues) •
  [Request Feature](https://github.com/cindyunrau/bolt-head/issues) 

</div>
<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#to-do">To-do</a></li>
    <li><a href="#deliverables">Deliverables</a></li>
    <li><a href="#resources">Resources</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
<p align="center">
    <img src="Images/screenshot.jpg" alt="Screenshot">
  </a>
</p>

Program in JavaScript/WebGL that draws an animated scene of the friendly robot bolt-head! Uses hierarchical transformations, the camera, textures, and shaders.

### Built With
* [![WebGL][webGL-shield]][webGL-url]
* [![Python][python-shield]][python-url]

<p align="right">
  <a href="#top">to the top!</a>
</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To use textures in WebGL we have to bypass a security issue that is present in most browsers. (Related to "Cross-origin image" Error) Below are three strategies to solve.

#### Python Server

* Navigate to code folder
* Run the server
   ```python -m http.server 8080```
* Open localhost in browser
   ```localhost:8080```
* Click on the HTML file

#### Firefox

* Go to:
  ```about:config```
* Find:
  ```security.fileuri.strict_origin_policy```
* Set to false

#### Chrome

* Close all running chrome instances
* Then start Chrome executable with a command line flag 
  ```chrome --allow-file-access-from-files```

<p align="right">
  <a href="#top">beam me up!</a>
</p>

:heart:
:yellow_heart:
:green_heart:
:blue_heart: 
:purple_heart:


<!-- BADGES -->
[milestones-shield]: https://img.shields.io/github/milestones/all/cindyunrau/bolt-head?color=%23ff69b4&style=for-the-badge
[milestones-url]: https://google.ca
[last-commit-shield]: https://img.shields.io/github/last-commit/cindyunrau/bolt-head/main?color=%2300ffff&style=for-the-badge
[last-commit-url]: https://github.com/cindyunrau/bolt-head/commits/main
[stars-shield]: https://img.shields.io/github/stars/cindyunrau/bolt-head.svg?color=%23fff740&style=for-the-badge
[stars-url]: https://github.com/cindyunrau/bolt-head
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/cindyunrau
[webGL-shield]: https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white&style=for-the-badge
[webGL-url]: https://get.webgl.org/
[python-shield]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[python-url]: https://www.python.org/

<!-- IMAGES -->
[featured-image]: images/robot.gif

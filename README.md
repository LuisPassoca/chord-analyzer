<div align='center'>
  <img src="https://github.com/user-attachments/assets/db09a6b3-8b89-4359-9428-456334246383" width="50px"/>
  <h1>
    Chord Analyzer & Interactive Webpage
  </h1>
</div>

A JavaScript application that, given a input of notes, returns the closest matching chord and all its details, along with other possible chord matches. 
The project also features an interactive webpage built with React that allows for quickly checking chords whilst also being able to hear them.

<div align='center'>
 <h3><a href='https://passoca.neocities.org/chord-analyzer/'>Check out the webpage here!</a></h3>
</div>

## About the project
The project was built entirely using JavaScript, along with React. All image assets were designed in Figma.

## How the webpage works
- The user can select notes to identify on a virtual piano keyboard whilst listening to their audio;
- It is possible to hear chord in full by pressing the play button or clear the pressed notes with the reset button;
- The page returns the info of the best matching chord for the input notes.

<div align='center'>
  <img width="581" height="430" alt="image" src="https://github.com/user-attachments/assets/de18aa26-edd8-44e8-a9ae-a615610d4acd" />
</div>

- Aditionally, there is also an option to display other matching alternatives.

<div align='center'>
  <img width="557" height="152" alt="image" src="https://github.com/user-attachments/assets/c5489ad6-0851-477b-918d-e08c02c7c51c" />
</div>

## How the algorithm works
1. The user input is normalized and all possible chord inversions are compared to a known chords database, looking for a match;
2. If there are no matches found, the algorithm locates the most similar known chord and adds onto it (e.g.: add9);
3. Finally, the script returns the best possible match, followed by alternatives, all containing the chord names in full, their root note and their inversion root note (if applicable).

## Script usage
- If you would like to use the script without the webpage, you can download the chordAnalyzer.js file;
- It is possible to run the script with Node or use it as an exported function for another application;
- For more details, please check the last lines of commented code in the main script file.



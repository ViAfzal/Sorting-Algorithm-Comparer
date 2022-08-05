import React from "react";
import {
  bubbleSortAnimations,
  insertionSortAnimations,
  mergeSortAnimations,
  quickSortAnimations,
  heapSortAnimations
} from '../sortingAlgorithms/sortingAlgorithms';
import './SortingComparer.css';

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
// Visual constants
const MAX_DELAY = 25; // in ms
let DELAY; // To be selected by user input
const MERGE_SORT_DELAY = 2 / 3;
// Set 10 as the divisor to maximize the number of bars while being visually pleasant.
let NUM_BARS = Math.floor(WINDOW_WIDTH / 10);
const MIN_BAR_HEIGHT = 50; // in px
// Set 1.7 as the divisor to maximize bar height while being visually pleasant.
let MAX_BAR_HEIGHT = Math.floor(WINDOW_HEIGHT / 1.7); // in px
const DEFAULT_COLOR = "#00f7ff"; // in hex
const COMPARISON_COLOR = "#ff0048"; // in hex
// Constants used to distinguish the user-selected algorithm.
const BUBBLE_SORT = 0,
      INSERTION_SORT = 1,
      HEAP_SORT = 2,
      MERGE_SORT = 3,
      QUICK_SORT = 4;
const ALGOS = [BUBBLE_SORT, INSERTION_SORT, HEAP_SORT, MERGE_SORT, QUICK_SORT];
const ALGO_NAMES = ["Bubble Sort", "Insertion Sort", "Heap Sort", "Merge Sort", "Quick Sort"];
const NUM_ALGOS = 5;

export default class SortingComparer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrA: [], // Left-hand array
      arrB: [], // Right-hand array
      aSort: 0, // Sorting algorithm that will be used on the left-hand array;
      bSort: 1, // these will be toggled by the user.
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const arrA = [];
    const arrB = [];
    for (let i = 0; i < NUM_BARS; i++) {
      // Generate a random integer in range [MIN_BAR_HEIGHT, MAX_BAR_HEIGHT)
      // to serve as one of the NUM_BARS array elements that will be sorted.
      const val = Math.floor(Math.random() * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT)) + MIN_BAR_HEIGHT;
      // Both arrays will contain the same elements in order to
      // directly compare the efficiency of two algorithms.
      arrA.push(val);
      arrB.push(val);
    }
    // Update global arrayA and arrB with these arrays.
    this.setState({arrA});
    this.setState({arrB});
  }

  toggleAlgo(algo, a) { // algo is either BUBBLE_SORT, INSERTION_SORT, etc.
                        // a is a boolean that signals which array's algorithm is being toggled.
    // Determine the correct array to act on.
    const arr = a ? "-a" : "-b";
    // Update state appropriately.
    if (a) this.setState({aSort: algo});
    else this.setState({bSort: algo});
    // Select the given algorithm.
    document.getElementById("algo-" + algo + arr).className = "algo-selected";
    // Deselect the remaining algorithms (which includes the one previously selected).
    for (let i = 0; i < NUM_ALGOS; i++) {
      if (i !== algo) {
        document.getElementById("algo-" + i + arr).className = "algo-deselected";
      }
    }
  }

  // Function whose animation input (frames) results in a Bubble, Insertion, or Quick Sort output.
  // If isArrA == true, the animations act on the left-hand array, else the right-hand array.
  sort(frames, isArrA) {
    for (let i = 0; i < frames.length; i++) {
      const arrBars = isArrA ? document.getElementsByClassName("arr-bar-a") :
          document.getElementsByClassName("arr-bar-b");
      if (i % 2 === 0) { // The bars, A and B, are being compared.
        const [barAIndex, barBIndex] = frames[i]; // frames[i] has the two indeces being compared.
        const barAStyle = arrBars[barAIndex].style;
        const barBStyle = arrBars[barBIndex].style;
        setTimeout(() => { // Update the background color of the two corresponding array bars.
          // This is to be done according to a delay, resulting in animation.
          barAStyle.backgroundColor = COMPARISON_COLOR;
          barBStyle.backgroundColor = COMPARISON_COLOR;
        }, i * DELAY);
      } else { // Comparison complete; update bar heights and colors.
        setTimeout(() => {
          // frames[i] has the indeces and updated heights of the two compared elements.
          const [barAIndex, barAHeight, barBIndex, barBHeight] = frames[i];
          // Update the first bar's height and background color.
          const barAStyle = arrBars[barAIndex].style;
          barAStyle.height = `${barAHeight}px`;
          barAStyle.backgroundColor = DEFAULT_COLOR;
          // Update the second bar.
          const barBStyle = arrBars[barBIndex].style;
          barBStyle.height = `${barBHeight}px`;
          barBStyle.backgroundColor = DEFAULT_COLOR;
        }, i * DELAY);
      }
    }
  }

  // Separate method for mergeSort due to the use of auxiliary data structures.
  mergeSort(arr, isArrA) {
    // frames contains a series of element triplets.
    // The first changes the bar color of two compared elements.
    // The second changes the bar color of two compared elements back to defualt.
    // The third updates the height of an altered element.
    const frames = mergeSortAnimations(arr);
    for (let i = 0; i < frames.length; i++) {
      const arrBars = isArrA ? document.getElementsByClassName("arr-bar-a") :
          document.getElementsByClassName("arr-bar-b");
      if (i % 3 !== 2) { // A color change will occur.
        // The two bars to be animated are named A and B.
        // Their indeces correspond to the two elements of frames[i].
        const [barAIndex, barBIndex] = frames[i];
        const barAStyle = arrBars[barAIndex].style;
        const barBStyle = arrBars[barBIndex].style;
        // Determine appropriate color change (1st or 2nd frame in sequence).
        const color = i % 3 === 0 ? COMPARISON_COLOR : DEFAULT_COLOR;
        setTimeout(() => { // Update by a delay to match animation speed of the other algorithms.
          barAStyle.backgroundColor = color;
          barBStyle.backgroundColor = color;
        }, i * DELAY * MERGE_SORT_DELAY);
      } else { // Correctly update the height of the given bar.
        setTimeout(() => {
          const [barAIndex, newHeight] = frames[i];
          const barAStyle = arrBars[barAIndex].style;
          barAStyle.height = `${newHeight}px`;
        }, i * DELAY * MERGE_SORT_DELAY);
      }
    }
  }

  render() {
    const {arrA, arrB, aSort, bSort} = this.state;
    return (
      <div className="component-container">
        <div id="title">
          Sort Compare
        </div>
        <div id="desc">
          Select an algorithm to sort the array on the left,
          and likewise for the mirrored array on the right.<br></br>
          Use the tools at the bottom of this page to
          reset, customize, and run the program.<br></br>
          If you change the size of your browser window,
          refresh this page to update the array sizes.
        </div>
        {/* Container for the left-hand array display. */}
        <div className="arr-container" id="arr-container-a">
          {/* Map each array element to a displayed bar. 
              The bar height corresponds to the element value,
              while the bar positions corresponds to the element index. */}
          {arrA.map((val, index) => (
            <div
              className="arr-bar-a"
              key={index}
              style={{
                backgroundColor: DEFAULT_COLOR,
                height: `${val}px`,
              }}></div>
          ))}
          {/* Options for the algorithm to be used on the left-hand array. */}
          <div className="algo-container" id="arrA-algo">
          {ALGOS.map((algo) => (
            <div
              className= {algo !== BUBBLE_SORT ? "algo-deselected" : "algo-selected"}
              id={"algo-" + algo + "-a"}
              onClick={() => this.toggleAlgo(algo, true)}
              >{ALGO_NAMES[algo]}</div>
          ))}
          </div>
        </div>
        {/* Container for the right-hand array display. */}
        <div className="arr-container" id="arr-container-b">
          {arrB.map((value, index) => (
            <div
              className="arr-bar-b"
              key={index}
              style={{
                backgroundColor: DEFAULT_COLOR,
                height: `${value}px`,
            }}></div>
          ))}
          <div>
            {/* Options for the algorithm to be used on the right-hand array. */}
            <div className="algo-container" id="arrB-algo">
            {ALGOS.map((algo) => (
              <div
                className= {algo !== INSERTION_SORT ? "algo-deselected" : "algo-selected"}
                id={"algo-" + algo + "-b"}
                onClick={() => this.toggleAlgo(algo, false)}
                >{ALGO_NAMES[algo]}</div>
            ))}
            </div>
          </div>
        </div>
        {/* User input for generating new arrays, setting animation speed,
            and executing the algorithms. */}
        <div id="user-input-container">
          <button id="arr-gen" onClick={() => this.resetArray()}>Generate New Array</button>
          <button id="sort-execute" onClick={() => {
            // Determine animation speed
            DELAY = MAX_DELAY - document.getElementById("delay-input").value;
            // Determine algoorithm selection for left-hand array
            const sortAnims = [
              bubbleSortAnimations,
              insertionSortAnimations,
              heapSortAnimations,
              null,
              quickSortAnimations
            ];
            if (aSort !== MERGE_SORT) {
              this.sort(sortAnims[aSort](arrA), true);
            } else {
              this.mergeSort(arrA, true);
            }
            // Determine algoorithm selection for right-hand array
            if (bSort !== MERGE_SORT) {
              this.sort(sortAnims[bSort](arrB), false);
            } else {
              this.mergeSort(arrB, false);
            }
          }}>Sort</button>
          <div id="anim-speed">
            <label>Animation Speed</label><br></br>
            <input type="range" min="0" max="22" id="delay-input"></input>
          </div>
        </div>
      </div>
    );
  }
}
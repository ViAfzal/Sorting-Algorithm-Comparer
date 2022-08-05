/**
 * Swaps two elements from an array.
 * @param   arr The array from which elements will be swapped.
 * @param   a   The first index of the array.
 * @param   b   The second index of the array.
 * This function will move arr[a] to index b, and arr[b] to index a.
 */
const swap = (arr, a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

/*========================================= BUBBLE SORT =========================================*/

/**
 * Animates the Bubble Sort algorithm.
 * @param   arr     The array to sort.
 * @return  array   The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
export function bubbleSortAnimations(arr) {
    const frames = [];
    if (arr.length <= 1) return arr; // Already sorted
    for (let i = 0; i < arr.length; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) { // Iterate until the sorted end
            frames.push([j, j + 1]); // Change color to display the comparison
            if (arr[j] > arr[j + 1]) { // Swap out of order elements
                swap(arr, j, j + 1);
                swapped = true;
            }
            frames.push([j, arr[j], j + 1, arr[j + 1]]); // Update bar heights and colors
        }
        if (!swapped) return frames; // All elements are already sorted
    }
    return frames;
}

/*======================================= INSERTION SORT =======================================*/

/**
 * Animates the Insertion Sort algorithm.
 * @param   arr     The array to sort.
 * @return  array   The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
export function insertionSortAnimations(arr) {
    const frames = [];
    if (arr.length <= 1) return arr; // Already sorted
    for (let i = 1; i < arr.length; i++) { // Element 0 is treated as sorted
        const temp = arr[i];
        let j = i;
        while (j > 0 && temp < arr[j - 1]) { // Two elements are out of order
            frames.push([j, j - 1]); // Comparison is made
            swap(arr, j, j - 1); // Swap occurs
            frames.push([j, arr[j], j - 1, arr[j - 1]]); // Bars are visually updated
            j--;
        }
    }
    return frames;
}

/*========================================= MERGE SORT =========================================*/

/**
 * Animates the Merge Sort algorithm.
 * @param   arr     The array to sort.
 * @return  array   The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
export function mergeSortAnimations(arr) {
    const frames = [];
    if (arr.length <= 1) return arr; // Already sorted
    const auxArr = arr.slice();
    mergeSortHelper(arr, 0, arr.length - 1, auxArr, frames);
    return frames;
}

/**
 * Helper method for the Merge Sort algorithm.
 * @param   mainArr The array to sort.
 * @param   start   The starting index of the array's unsorted portion.
 * @param   end     The final index of the array's unsorted portion.
 * @param   auxArr  The auxiliary array which will be used to swap elements with mainArr.
 * @param   frames  The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
function mergeSortHelper(mainArr, start, end, auxArr, frames) {
    if (start === end) return; // Base case
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(auxArr, start, mid, mainArr, frames); // Recursive MergeSort of left half
    mergeSortHelper(auxArr, mid + 1, end, mainArr, frames); // Recursive MergeSort of right half
    merge(mainArr, start, mid, end, auxArr, frames); // Merge the two sorted halves together
}

/**
 * Helper method for the Merge Sort algorithm.
 * @param   mainArr The array to sort.
 * @param   start   The starting index of the array's pre-sorted portion.
 * @param   mid     The pivotal index of the array's pre-sorted portion.
 * @param   end     The final index of the array's pre-sorted portion.
 * @param   auxArr  The auxiliary array which will be used to swap elements with mainArr.
 * @param   frames  The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
function merge(mainArr, start, mid, end, auxArr, frames) {
    let i = start, j = mid + 1, k = start;
    while (i <= mid && j <= end) {
        // First push to change color, second push to undo change
        frames.push([i, j]);
        frames.push([i, j]);
        if (auxArr[i] <= auxArr[j]) { // Elements are ordered correctly
            frames.push([k, auxArr[i]]);
            mainArr[k++] = auxArr[i++];
        } else { // Overwrite mainArr[k] with auxArr[j]
            frames.push([k, auxArr[j]]);
            mainArr[k++] = auxArr[j++];
        }
    }
    while (i <= mid) {
        // First push to change color, second push to undo change
        frames.push([i, i]);
        frames.push([i, i]);
        // Overwrite mainArr[k] with auxArr[i]
        frames.push([k, auxArr[i]]);
        mainArr[k++] = auxArr[i++];
    }
    while (j <= end) {
        // First push to change color, second push to undo change
        frames.push([j, j]);
        frames.push([j, j]);
        // Overwrite mainArr[k] with auxArr[j]
        frames.push([k, auxArr[j]]);
        mainArr[k++] = auxArr[j++];
    }
}

/*========================================= QUICK SORT =========================================*/

/**
 * Animates the Quick Sort algorithm.
 * @param   arr     The array to sort.
 * @return  array   The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
export function quickSortAnimations(arr) {
    const frames = [];
    if (arr.length <= 1) return arr;
    quickSort(arr, 0, arr.length - 1, frames);
    return frames;
}

/**
 * The Quick Sort algorithm.
 * @param   arr     The array to sort.
 * @param   start   The starting index of the array to sort.
 * @param   end     The final index of the array to sort.
 * @param   frames  The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
function quickSort(arr, start, end, frames) {
    // Base case: arr.length <= 1, thus arr is already sorted.
    if (arr.length > 1) {
        let pivot = quickSortHelper(arr, start, end, frames); // Sort the array about a pivot
        if (start < pivot - 1) quickSort(arr, start, pivot - 1, frames); // Sort left of the pivot
        if (end > pivot) quickSort(arr, pivot, end, frames); // Sort right of the pivot
    }
}

/**
 * Helper method for the Quick Sort algorithm.
 * @param   arr     The array to sort.
 * @param   start   The starting index of the array to sort.
 * @param   end     The final index of the array to sort.
 * @param   frames  The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
function quickSortHelper(arr, start, end, frames) {
    // Choose the pivot, arbitrarily as the middle element.
    const mid = Math.floor((start + end) / 2);
    const pivot = arr[mid];
    // Swap all elements about the pivot such that:
    // - all elements left of the pivot are less than the pivot
    // - all elements right of the pivot are greater than the pivot
    let i = start, j = end;
    while (i <= j) {
        while (arr[i] < pivot) {
            frames.push([i, mid]);
            frames.push([i, arr[i], mid, pivot]);
            i++;
        }
        while (arr[j] > pivot) {
            frames.push([j, mid]);
            frames.push([j, arr[j], mid, pivot]);
            j--;
        }
        if (i <= j) {
            frames.push([i, j]);
            swap(arr, i, j);
            frames.push([i, arr[i], j, arr[j]]);
            i++;
            j--;
        }
    }
    return i;
}

/*========================================== HEAP SORT ==========================================*/

/**
 * Animates the Heap Sort algorithm.
 * @param   arr     The array to sort.
 * @return  array   The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
export function heapSortAnimations(arr) {
    const frames = [];
    if (arr.length <= 1) return arr;
    heapSort(arr, arr.length, frames);
    return frames;
}

/**
 * The Heap Sort algorithm.
 * This method uses a max heapify helper to sort the array in ascending order.
 * @param   arr     The array to sort.
 * @param   end     The length of the array to be sorted.
 * @param   frames  The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
function heapSort(arr, end, frames) {
    // Build heap
    for (let i = Math.floor(end / 2 - 1); i >= 0; i--) {
        heapSortHelper(arr, end, i, frames);
    }
    // Remove each element from the heap
    for (let i = end - 1; i >= 0; i--) {
        // Current root is moved to end, then modified sub-tree is re-heapified
        frames.push([0, i]);
        swap(arr, 0, i);
        frames.push([0, arr[0], i, arr[i]]);
        heapSortHelper(arr, i, 0, frames);
    } 
}

/**
 * Helper method for the Heap Sort algorithm. Uses a max heap to yield an ascending-ordered array.
 * @param   arr     The array to sort.
 * @param   end     The length of the array to be sorted.
 * @param   i       The index of the final unsorted element in the array.
 * @param   frames  The sequence of comparisons and height changes which were executed.
 *                  This will be used to animate the process of the sorting algorithm.
 */
function heapSortHelper(arr, end, i, frames) {
    let largest = i;
    let l = 2 * i + 1; // Left child index
    let r = 2 * i + 2; // Right child index
    // Determine if a child is larger than the root
    if (l < end && arr[l] > arr[largest]) largest = l;
    if (r < end && arr[r] > arr[largest]) largest = r;
    // If smallest is not root, swap and heapify the modified sub-tree
    if (largest !== i) { 
        frames.push([i, largest]);
        swap(arr, i, largest);
        frames.push([i, arr[i], largest, arr[largest]]);
        heapSortHelper(arr, end, largest, frames);
    }
}
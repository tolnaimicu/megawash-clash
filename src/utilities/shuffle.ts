export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // swapping the current element with the a random one
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }


    // returign the shuffled array
    return array;
  }
  
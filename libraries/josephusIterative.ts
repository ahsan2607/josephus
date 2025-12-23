export function josephusIterative(
  participants: string[],
  k: number,
  n: number,
): string {
  if (participants.length === 0 || k <= 0 || n <= 0) {
    throw new Error("Input tidak valid");
  } else {
    const arr = [...participants];
    if (n !== arr.length) {
      throw new Error("n harus sama dengan jumlah peserta");
    } else {
      let index = 0;
      while (n > 1) {
        let steps = 1;

        while (steps < k) {
          index++;
          if (index >= n) { index = 0 }
          steps++;
        }

        for (let i = index; i < n - 1; i++) {
          arr[i] = arr[i + 1];
        }
        n--;

        if (index >= n) { index = 0 }
      }
      window.alert("Ini pakai Iteratif");
      return arr[0];
    }
  }
}

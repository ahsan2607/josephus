export function josephusRecursive(
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
      window.alert("Ini pakai Rekursif");
      return eliminate(arr, n, k, 0);
    }
  }
}

function eliminate(
  arr: string[],
  n: number,
  k: number,
  index: number
): string {
  if (n === 1) {
    return arr[0];
  } else {
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

    return eliminate(arr, n, k, index);
  }
}

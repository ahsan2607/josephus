export function josephusRecursive(
  participants: string[],
  k: number
): string {
  if (participants.length === 0 || k <= 0) {
    throw new Error("Input tidak valid");
  }

  const arr = [...participants];
  window.alert("Ini pakai Rekursif");
  return eliminate(arr, arr.length, k, 0);
}

function eliminate(
  arr: string[],
  size: number,
  k: number,
  index: number
): string {
  if (size === 1) {
    return arr[0];
  }

  let steps = 1;

  while (steps < k) {
    index++;
    if (index >= size) index = 0;
    steps++;
  }

  for (let i = index; i < size - 1; i++) {
    arr[i] = arr[i + 1];
  }
  size--;

  if (index >= size) index = 0;

  return eliminate(arr, size, k, index);
}

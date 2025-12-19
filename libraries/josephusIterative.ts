export function josephusIterative(
  participants: string[],
  k: number
): string {
  if (participants.length === 0 || k <= 0) {
    throw new Error("Input tidak valid");
  }

  const arr = [...participants];
  let size = arr.length;
  let index = 0;

  while (size > 1) {
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
  }

  window.alert("Ini pakai Iteratif");
  return arr[0];
}

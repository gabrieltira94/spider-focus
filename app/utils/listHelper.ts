import { Task } from "@/app/dto/task.dto";

interface Sortable {
  position: number;
}

// a little function to help us with reordering the result
export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const mapPositionByIndex = <T extends Sortable>(arr: T[]) => {
  return arr.map((item, index) => {
    item.position = index;
    return item;
  });
};

export const sortByPosition = <T extends Sortable>(
  arr: T[]
): T[] => {
  return arr.sort((first, second) => {
    if (first.position < second.position)
      return -1;
    if (first.position > second.position)
      return 1;

    return 0;
  });
};

export const sortByIsDone = (tasks: Task[]) => {
  return tasks.sort((first, second) => {
    if (!first.isDone && second.isDone)
      return -1;
    if (first.isDone && !second.isDone)
      return 1;

    return 0;
  });
};

export const uniqueId = () => Math.random() * 500;
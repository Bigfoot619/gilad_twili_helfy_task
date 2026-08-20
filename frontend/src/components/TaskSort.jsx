function TaskSort({ onSortChange }) {
  return (
    <select onChange={(event) => onSortChange(event.target.value)}>
      <option value="">Sort By</option>
      <option value="date">Date</option>
      <option value="priority">Priority</option>
      <option value="title">Title</option>
    </select>
  );
}

export default TaskSort;
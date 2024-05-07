"use client";

import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_TODO_LIST = gql`
  query GetTodoList {
    getTodoList {
      id
      name
      checked
    }
  }
`;

/**
 * RESEARCH
 * 1. Passing variables to useQuery or useLazyQuery
 * 2. Add todo Mutation
 * 3. Todo check toggle mutation
 * 4. Todo delete mutation
 */

//

export default function Home() {
  // const { data, error, loading } = useQuery(GET_TODO_LIST);
  const [getData, { data, error, loading }] = useLazyQuery(GET_TODO_LIST);

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading....</div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center">Error!</div>;
  }
  if (data)
    return (
      <div className="min-h-screen flex justify-center items-center flex-col gap-4">
        <form className="flex" onSubmit={onSubmit}>
          <input type="text" placeholder="Todo title..." className="input input-bordered w-full max-w-xs" />
          <button className="btn">Add</button>
        </form>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          {data.getTodoList.map((todo: any) => (
            <li key={todo.id} className="flex gap-4 items-center">
              <input type="checkbox" className="toggle" checked={todo.checked} />
              {todo.name}
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center">
      <button className="btn btn-outline" onClick={() => getData()}>
        Fetch data
      </button>
    </div>
  );
}

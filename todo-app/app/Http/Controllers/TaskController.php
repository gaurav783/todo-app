<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(){
    $all_task = Task::all();

   return response()->json([
    'message' => 'Tasks fetched successfully!',
    'data' => $all_task->toArray() // Converts the collection to an array
], 200);
}

public function destroy(Request $request, $id)
    {
        // Find the task by its ID
        $task = Task::find($id);

        // Check if the task exists
        if (!$task) {
            return response()->json([
                'message' => 'Task not found.'
            ], Response::HTTP_NOT_FOUND);
        }

        // Delete the task from the database
        $task->delete();

        // Return a JSON response to indicate success
        return response()->json([
            'message' => 'Task deleted successfully.'
        ], 200);
    }


    public function update(Request $request, $id)
{
    // Validate the request data
    $request->validate([
        'is_completed' => 'required|in:0,1',
    ]);

    // Find the task by its ID
    $task = Task::find($id);

    // Check if the task exists
    if (!$task) {
        return response()->json([
            'message' => 'Task not found.'
        ], Response::HTTP_NOT_FOUND);
    }

    // Update the 'completed' status with 0 or 1
    $task->is_completed = $request->input('is_completed');
    $task->save();

    // Return a JSON response to indicate success
    return response()->json([
        'message' => 'Task status updated successfully.',
        'task' => $task
    ], 200);
}

    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|unique:tasks,title',
    ]);

    Task::create([
        'title' => $request->title,
    ]);

    return response()->json('Task created!');
}
}

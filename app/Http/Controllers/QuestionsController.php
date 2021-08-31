<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function index()
    {
        $questions = Question::all();

        return response()->json([
            'questions' => $questions
        ], 200);
    }
}

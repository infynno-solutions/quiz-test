<?php

namespace Database\Seeders;

use App\Models\Question;
use Faker\Factory;
use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            Question::create([
                'question' => $faker->realText(10),
                'answer' => $faker->boolean(50)
            ]);
        }
    }
}

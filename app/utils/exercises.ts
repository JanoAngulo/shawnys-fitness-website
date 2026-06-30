export interface Exercise {
  id: string
  name: string
  muscle: string
  equipment: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  instructions: string
}

export const MUSCLES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'] as const
export const EQUIPMENT = ['All', 'Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Kettlebell'] as const

export const EXERCISES: Exercise[] = [
  { id: 'bb-bench', name: 'Barbell Bench Press', muscle: 'Chest', equipment: 'Barbell', level: 'Intermediate', instructions: 'Lie flat, grip just outside shoulders, lower the bar to mid-chest, press back up without flaring the elbows.' },
  { id: 'incline-db', name: 'Incline Dumbbell Press', muscle: 'Chest', equipment: 'Dumbbell', level: 'Beginner', instructions: 'Set the bench to 30°, press the dumbbells up and slightly together, control the descent.' },
  { id: 'pushup', name: 'Push-up', muscle: 'Chest', equipment: 'Bodyweight', level: 'Beginner', instructions: 'Hands under shoulders, body in a straight line, lower until elbows hit 90°, push back up.' },
  { id: 'deadlift', name: 'Conventional Deadlift', muscle: 'Back', equipment: 'Barbell', level: 'Advanced', instructions: 'Hips back, flat spine, drive through the floor and stand tall. Keep the bar close to your shins.' },
  { id: 'pullup', name: 'Pull-up', muscle: 'Back', equipment: 'Bodyweight', level: 'Intermediate', instructions: 'Hang from the bar, pull your chest toward it, control the way down. Full range each rep.' },
  { id: 'row', name: 'Bent-over Row', muscle: 'Back', equipment: 'Barbell', level: 'Intermediate', instructions: 'Hinge to 45°, pull the bar to your belly, squeeze the shoulder blades, lower under control.' },
  { id: 'lat-pull', name: 'Lat Pulldown', muscle: 'Back', equipment: 'Machine', level: 'Beginner', instructions: 'Grip wide, pull the bar to your collarbone, drive the elbows down and back.' },
  { id: 'squat', name: 'Back Squat', muscle: 'Legs', equipment: 'Barbell', level: 'Intermediate', instructions: 'Bar on the traps, brace, sit between your hips to depth, drive up through mid-foot.' },
  { id: 'leg-press', name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', level: 'Beginner', instructions: 'Feet shoulder-width, lower until knees reach 90°, press without locking out hard.' },
  { id: 'lunge', name: 'Walking Lunge', muscle: 'Legs', equipment: 'Dumbbell', level: 'Beginner', instructions: 'Step forward, drop the back knee toward the floor, push through the front heel to stand.' },
  { id: 'rdl', name: 'Romanian Deadlift', muscle: 'Legs', equipment: 'Barbell', level: 'Intermediate', instructions: 'Soft knees, push hips back, feel the hamstrings stretch, stand tall and squeeze the glutes.' },
  { id: 'ohp', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', level: 'Intermediate', instructions: 'Bar at the collarbone, brace, press overhead, finish with the bar over the mid-foot.' },
  { id: 'lat-raise', name: 'Lateral Raise', muscle: 'Shoulders', equipment: 'Dumbbell', level: 'Beginner', instructions: 'Slight bend in the elbow, raise to shoulder height, lead with the elbows, lower slowly.' },
  { id: 'kb-swing', name: 'Kettlebell Swing', muscle: 'Shoulders', equipment: 'Kettlebell', level: 'Intermediate', instructions: 'Hinge and hike the bell back, snap the hips forward to float it to chest height.' },
  { id: 'curl', name: 'Dumbbell Curl', muscle: 'Arms', equipment: 'Dumbbell', level: 'Beginner', instructions: 'Elbows pinned, curl without swinging, squeeze at the top, lower under control.' },
  { id: 'tricep', name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Machine', level: 'Beginner', instructions: 'Elbows tight to your sides, push the bar down to full extension, return slowly.' },
  { id: 'plank', name: 'Plank', muscle: 'Core', equipment: 'Bodyweight', level: 'Beginner', instructions: 'Forearms down, body in a line, brace the abs and glutes, breathe, hold the time.' },
  { id: 'hanging-raise', name: 'Hanging Leg Raise', muscle: 'Core', equipment: 'Bodyweight', level: 'Advanced', instructions: 'Hang tall, raise the legs to parallel without swinging, lower with control.' }
]

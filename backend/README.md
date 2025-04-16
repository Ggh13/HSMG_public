# Shortcuts
- [API](#api)
- [Entities](#entities)
- [Backend start](#backend-start)

## Backend start
1)
    ```bash
    cd backend 
    ```
2)
    ```bash
    go run cmd/main.go
    ```
3) If it doesnt run try
    ```bash
    go mod tidy 
    ```


## API
- [Registration/Authorisation](#registrationauthorisation)
- [Training](#training)
- [Training_Process](#trainig_process)
- [User](#user)
- [Achievements](#achievements)
- [Comunity](#comunity)
- [Searching trainings](#searching-trainings)
- [Rating system]()

## Registration/Authorisation
Пока без логики refreshToken если че потом добавим, на это просто нужно время. Регистрация/Авторизация будет работать и без него
#### Register POST ```/api/register```
- Request:
JSON [User_Register](#user_register)
- Response:
[HTTP status](#http-status-200ok-400-500)

#### Login POST ```/api/login```
- Request:
JSON [User_auth](#user_auth)
- Response:
[HTTP status](#http-status-200ok-400-500); Also return json{"message":"", "token": (accessToken)}


## Training

#### Create Training POST ```/api/training_program/add```
-   Request:
[Training](#training-1)
JSON with Authorization header, where accessToken locate
-   Response:
[HTTP status](#http-status-200ok-400-500)

#### Update Training POST ```/api/training_program/update```
-   Request:
[Training](#training-1)
JSON with Authorization header, where accessToken locate
-   Response:
[HTTP status](#http-status-200ok-400-500)

#### Get Training GET ```/api/training_program/get/:id_training_program```
-   Request:
none
-   Response:
[Training](#training-1)
[HTTP status](#http-status-200ok-400-500)


## Trainig_process
#### Done Exercise POST ```/api/update_training_version/:training_id```
-   Request:
[Training](#training-1)
JSON with Authorization header, where accessToken locate
-   Response: 
[HTTP status](#http-status-200ok-400-500)

#### Done exercise POST ```/api/user_done_exercise```
-   Request: Authorisation header with accessToken
[History_exercise](#history_exercise)
-   Response: 
[HTTP status](#http-status-200ok-400-500)

## User
#### Get user data GET ```/api/user_data/:id_user```
-   Request:
none
-   Response: JSON [User](#user-1),
[HTTP status](#http-status-200ok-400-500)

#### Get user data GET ```/api/get_authorized_user_data```
-   Request:
JSON with Authorization header, where accessToken locate
-   Response: JSON [User](#user-1),
[HTTP status](#http-status-200ok-400-500)

#### Update user's profile POST ```/api/update_user_data```
-   Request:
JSON [User](#user-1);
JSON with Authorization header, where accessToken locate
-   Response:
[HTTP status](#http-status-200ok-400-500)

#### Update social media POST ```/api/update_social_media```
-   Request:
JSON [Social_media](#social_media)
JSON with Authorization header, where accessToken locate
-   Response:
[HTTP status](#http-status-200ok-400-500)

## Achievements
#### To get possible achievements GET ```/api/user_bests_exercises```
-   Request:
Authorisation header with accessToken
-   Response:
[Best_Exercises](#best_exercises)

#### Create achievement POST ```/api/create_achievement```
-   Request:
JSON [Achievement](#achievement)
-   Response:
[HTTP status](#http-status-200ok-400-500)

#### To get user's achievements GET ```/api/get_achievements/:id_user```
-   Request:
none
-   Response: JSON [Achievements](#achievements)
[HTTP status](#http-status-200ok-400-500)

#### To delete achievement DELETE ```/api/delete_achievement/:id_achievement```
-   Request:
Authorisation header with accessToken
-   Response:
[HTTP status](#http-status-200ok-400-500)

## Comunity
#### Find people POST ```/api/find_people```
- Request:
[User_filter](#user_filter)
- Response:
[Users](#users)
[HTTP status](#http-status-200ok-400-500)

#### Add Friends POST ```/api/add_friend/:id_user```
- Request:
JSON with Authorization header, where accessToken locate
- Response:
[HTTP status](#http-status-200ok-400-500)

#### Delete from Friends DELETE ```/api/delete_friend/:id_user```
- Request:
JSON with Authorization header, where accessToken locate
- Response:
[HTTP status](#http-status-200ok-400-500)

#### Get Friends GET ```/api/get_friends```
- Request:
JSON with Authorization header, where accessToken locate
- Response:
[users](#users)


## Searching trainings
#### Find training POST ```/api/find_training```
- Request:
[Training Filter](#training-filter)
- Response:
[training programs]()
[HTTP status](#http-status-200ok-400-500);

#### Add training program to favourite POST ```/api/add_to_favourite/:id_program```
- Request:
JSON with Authorization header, where accessToken locate
- Response:[HTTP status](#http-status-200ok-400-500);

#### Delete training program from favourite DELETE ```/api/remove_favourite/:id_program```
- Request:
JSON with Authorization header, where accessToken locate
- Response:[HTTP status](#http-status-200ok-400-500);

#### Get favourite training programs GET  ```/api/favourite_training_programs```
- Request:
JSON with Authorization header, where accessToken locate
- Response:
[Training programs]()

## Statistic
#### Anthropometry statistic POST ```/api/get_anthropometry_statistic/:id_user```
-  Request:
[Anthropometry Filter](#anthropometry-filter)
-  Response:
[HTTP status](#http-status-200ok-400-500) & [Anthropometry statistic](#anthropometry-statistic-1)

#### Exercise Statistics POST ```/api/get_exercise_statistic/:id_user```
-  Request:
[Exercise Filter](#exercise-filter)
-  Response:
[HTTP status](#http-status-200ok-400-500) & [Statistic exercises](#statistic-for-exercises)


## Entities
-   [User](#user-1)
    -   [Social media](#social_media)
    -   [User review](#social_media)
    -   [User register](#user_register)
    -   [User authorisation](#user_auth)
    -   [Users](#users)
-   [Training](#training-1)
    -   [Generl training information](#general-training-information)
    -   -   [Training_programs](#general-information-training-programs)
    -   [Statistic training](#statistics_training)
    -   [In progres](#in_progress)
    -   [Author](#user)
    -   [Training day](#training_day)
        -   [Exercises](#exercise)
            -   [Approach](#approach)
                -   [In progrss Exercise](#in_progress_ex)
-   [Achievements](#achievements-1)
    -   [Achievement](#achievement)
-   [Training_History](#history_exercise)
-   [Reviews and rating]()
    -   [User review](#social_media)
    -   [User Stats](#statistics_user)
-   [Anthrophometry](#anthropometry)
    - [Anthropometry_stat](#anthropomery_stat)
-   Filters
    - [User Filter](#user-filter)
    - [Training filter](#training-filter)
    - [Anthropometry filter](#anthropometry-filter)

## user
```JSON
{
    "user_id": 9,
    "email": "sportik@gmail.com",
    "name": "John",
    "surname": "Doe",
    "nickname": "JohnSina",
    "avatar": "sdfghjkl",
    "social_media": {
      "telegram_url": "https://t.me/C4eboksar",
      "vk_url": "https://vk.com/",
      "youtube_url": "https://youtube.com"
    }
}
```

### Fields:
-    user_id: Unique user identifier.
-    email: User's email address.
-    name: User's first name.
-    surname: User's last name.
-    nickname: User's nickname.
-    avatar: Link to the user's avatar (or identifier).
-    social_media: Object containing links to the user's social media profiles.
      -    telegram_url: Link to Telegram.
      -    vk_url: Link to VK.

## users
```JSON
{
  "users": [
    {},
    {},
  ]
}
```

## Fields
- users: an array of user

## social_media
```JSON
{
  "telegram_url": "https://t.me/C4eboksar",
  "vk_url": "https://vk.com/",
  "youtube_url": "https://youtube.com"
}
```

### Fields
-    telegram_url: Link to Telegram.
-    vk_url: Link to VK.

### user_review
```JSON
{
    "id": 1,
    "user_rating": 3.0,
    "rating": 5,
    "review": "not bad"
}
```

#### Fields:
- id: Unique review identifier.
- user_rating: Rating given by the user (e.g., from 1 to 5).
- rating: Overall rating (possibly redundant, can be removed if not needed).
- review: Review text.

## User_Register
```JSON
{
  "email":              "sportik@gmail.com",
  "password":           "qwerty123!FF",
  "name":               "John",
  "surname":            "Doe",
  "nickname":           "JohnSina"
}
```
### Fields:
-    email: The user's email address (string).
-    password: The user's password (string). It should be securely hashed on the server side.
-    name: The user's first name (string).
-    surname: The user's surname (string).
-    nickname: Name that appearing on personal page and can be used to find people (string)

## User_auth
```JSON
{
  "email":    "user@example.com",
  "password": "secure_password"
}
```
### Fields:
-    email: The user's email address (string). This may be optional depending on the authentication method.
-    password: The user's password (string). It should be securely hashed on the server side.

### statistics_training
```JSON
{
    "views": 1200,
    "favourite": 60,
    "in_training": 15,
    "rating": 4.94,
    "reviews": [
      {
        "user_review": {
          "id": 1,
          "user_rating": 3.0,
          "rating": 5,
          "review": "not bad"
        }
      }
    ]
}
```

#### Fields:
- views: Number of views for the training program.
- favourite: Number of times the program has been added to favorites.
- in_training: Number of users currently following the program.
- rating: Overall program rating.
- reviews: Array of reviews.
  - user_review: Review object (see description above).

### in_progress
```JSON
{
    "flag": false,
    "progress": 30,
    "weight_progress": 0.3,
    "cycle": 0,
    "update_available": false,
    "want_updates": true
}
```

#### Fields:
- flag: Flag indicating whether the program is in progress.
- progress: Progress percentage of the program.
- weight_progress: Progress in terms of weight (e.g., increase in working weights).
- cycle: Current training cycle.
- update_available: Whether an update is available for the program.
- want_updates: Whether the user wants to receive updates.

### in_progress_ex
```JSON
{
    "flag": true,
    "done_weight": 20,
    "done_count": 11,
    "diff_done_rec_w": -10,
    "diff_done_rec_c": 1
}
```

#### Fields:
- flag: Flag indicating whether the set has been completed.
- done_weight: Weight used in the set.
- done_count: Number of repetitions completed in the set.
- diff_done_rec_w: Difference between the completed and recommended weight.
- diff_done_rec_c: Difference between the completed and recommended number of repetitions.

### approach
```JSON
{
    "recommended_weight": 30,
    "recommended_count": 10,
    "in_progress_ex": {
        "flag": true,
        "done_weight": 20,
        "done_count": 11,
        "diff_done_rec_w": -10,
        "diff_done_rec_c": 1
    }
}
```

#### Fields:
- recommended_weight: Recommended weight for the set.
- recommended_count: Recommended number of repetitions.
- in_progress_ex: Object containing information about the completed set (see description above).

### exercise
```JSON
{
  "name": "Жим штанги лёжа",
  "exercise_id": 1,
  "description": "Основное упражнение для развития грудных мышц.",
  "image": "https://example.com/images/bench_press.jpg",
  "example_exercise": "https://example.com/videos/bench_press.mp4",
  "approaches": [
  {
      "recommended_weight": 30,
      "recommended_count": 10,
      "in_progress_ex": {
          "flag": true,
          "done_weight": 20,
          "done_count": 11,
          "diff_done_rec_w": -10,
          "diff_done_rec_c": 1
      }
  }
  ]
}
```

#### Fields:
- name: Name of the exercise.
- exercise_id: a unique id of exercise in library
- description: Description of the exercise.
- image: Link to the exercise image.
- example_exercise: Link to a video demonstrating the exercise.
- approaches: Array of sets (see description above).

### training_day
```JSON
{
    "name": "День 1: Тренировка груди и трицепса",
    "description": "Базовая тренировка для развития мышц груди и трицепса.",
    "image": "https://example.com/images/day1.jpg",
    "week_day": "wednesday",
    "exercises": [
    {
        "name": "Жим штанги лёжа",
        "exercise_id": 1,
        "description": "Основное упражнение для развития грудных мышц.",
        "image": "https://example.com/images/bench_press.jpg",
        "example_exercise": "https://example.com/videos/bench_press.mp4",
        "approaches": [
        {
            "recommended_weight": 30,
            "recommended_count": 10,
            "in_progress_ex": {
                "flag": true,
                "done_weight": 20,
                "done_count": 11,
                "diff_done_rec_w": -10,
                "diff_done_rec_c": 1
            }
        }
        ]
    }
    ]
}
```

#### Fields:
- name: Name of the training day.
- description: Description of the training day.
- image: Link to the training day image.
- week_day: Day of the week associated with the training.
- exercises: Array of exercises (see description above).

### training
```JSON
{
  "training_id": 1,
  "version": 0,
  "name": "Top of the top",
  "description": "Программа тренировок для начинающих, направленная на развитие силы и выносливости.",
  "image": "https://example.com/images/training_program_1.jpg",
  "price": 1200,
  "flag": 1,
  "type" : "Bodybuilding",

  "author": {
    "user_id": 9,
    "email": "sportik@gmail.com",
    "name": "John",
    "surname": "Doe",
    "nickname": "JohnSina",
    "avatar": "sdfghjkl",
    "social_media": {
      "telegram_url": "https://t.me/C4eboksar",
      "vk_url": "https://vk.com/"
    }
  },

  "statistics_training": {
    "views": 1200,
    "favourite": 60,
    "in_training": 15,
    "rating": 4.94,
    "reviews": [
      {
        "user_review": {
          "id": 1,
          "user_rating": 3.0,
          "rating": 5,
          "review": "not bad"
        }
      }
    ]
  },

  "in_progress": {
    "flag": false,
    "progress": 30,
    "weight_progress": 0.3,
    "cycle": 0,
    "update_available": false,
    "want_updates": true
  },

  "training_days": [
    {
      "name": "День 1: Тренировка груди и трицепса",
      "description": "Базовая тренировка для развития мышц груди и трицепса.",
      "image": "https://example.com/images/day1.jpg",
      "week_day": "wednesday",
      "exercises": [
        {
          "name": "Жим штанги лёжа",
          "exercise_id": 1,
          "description": "Основное упражнение для развития грудных мышц.",
          "image": "https://example.com/images/bench_press.jpg",
          "example_exercise": "https://example.com/videos/bench_press.mp4",
          "approaches": [
            {
              "recommended_weight": 30,
              "recommended_count": 10,
              "in_progress_ex": {
                "flag": true,
                "done_weight": 20,
                "done_count": 11,
                "diff_done_rec_w": -10,
                "diff_done_rec_c": 1
              }
            }
          ]
        }
      ]
    }
  ]
}
```

#### Fields:
- id: Unique identifier for the training program.
- version: Version of the program.
- description: Description of the program.
- image: Link to the program image.
- price: Price of the program.
- flag: Program flag (e.g., active/inactive).
  - flag = -1 In archive(can restore or after archiveing can be deleted forever)
  - flag = 0 access only creator(draft)
  - flag = 1 All can have access
  - flag = 2 demo training(all can access, has a reference to major training)
  - flag = 3 paid training
- archived: Flag indicating whether the program is archived.
- author: Author object (see description above).
- statistics_training: Program statistics (see description above).
- in_progress: User's progress in the program (see description above).
- training_days: Array of training days (see description above).

## General training information 
```JSON
{
  "training_id": 1,
  "name": "top of the top",
  "description": "Программа тренировок для начинающих, направленная на развитие силы и выносливости.",
  "image": "https://example.com/images/training_program_1.jpg",
  "price": 1200,

  "views": 1200,
  "favourite": 60,
  "in_training": 15,
  "rating": 4.94,

  "author": {
    "user_id": 9,
    "email": "sportik@gmail.com",
    "name": "John",
    "surname": "Doe",
    "nickname": "JohnSina",
    "avatar": "sdfghjkl",
    "social_media": {
      "telegram_url": "https://t.me/C4eboksar",
      "vk_url": "https://vk.com/"
    }
  },
}
```

## General information training programs
```JSON
{
  "training_programs" :[
    {},
    {},
  ]
}
```

### Fields
- training_programs: an array of General_training_information

## achievement
```JSON
{
  "id":                 1,
  "name_exercise":      "bench press",
  "id_exercise":        3,
  "weight":             130,
  "count":              10,
  "date":               10.02.2024 12:30:19,
  "record_video":       "https://youtube.com/..."
}
```

### Fields:
-    id: An id of chosen exersise(int64)
-    name_exersize: Name of chosen exersise (string)
-    weight: Best lifted weight of chosen exersise (float32)
-    count: Times lifted best weight (int64)
-    record_video: video url of record (string). It can be nill(```""```) if there is no video

## achievenents
```JSON
{
  "achievements": [
    {},
    {},
  ]
}
```

### Fields 
- achievements: an array of achievement

## Anthropometry
```JSON
{
  "id":               1,
  "user_id":          1,
  "height":           180.5,
  "weight":           75.0,
  "neck_girth":       38.0,
  "shoulder_girth":   45.0,
  "chest_girth":      100.0,
  "waist_girth":      80.0,
  "biceps_girth":     30.0,
  "forearms_girth":   28.0,
  "hip_girth":        95.0,
  "quadriceps_girth": 60.0,
  "calf_girth":       40.0,
  "wrist_girth":      18.0,
  "ankle_girth":      22.0,
  "date":             "2025-02-12 16:59:18"
}
```

### Fields:
-    ID: A unique identifier for the anthropometry record (uint64).
-    user_id: A unique user id whith antrophometry (uint64)
-    Height: The height of the individual in centimeters (float32).
-    Weight: The weight of the individual in kilograms (float32).
-    Other fields represent various girth measurements in centimeters -(float32).

## Anthropomery_stat
```JSON
{
  "anthropomery_stat": [
    {},
    {},
  ]
}
```

## Anthropometry Filter
```JSON
{
  "start_date":"2025-02-12 16:59:18",
  "end_date": "2025-02-13 16:59:18",
  "body_part": "neck_girth"
}
```
### Fields
-   start_date: date since we want to know statistic
-   end_date: date until we want to know statistic


### Fields 
- anthropomery_stat: an array of anthropomery

## User Filter
```JSON
{
  "search_bar": "Test",
  "number_trainings": 1,
  "subscribers": 1
}
```

### Fields
- search_bar: a string that user type to find another user by nickname
- number_trainings: how many trainings user has(int)
- subscribers: how many subs user has(int)

## Training filter
```JSON
{
  "search_bar": "Test",
  "subscribers": 2,
  "id_training_type": 3
}
```

### Fields
- search_bar: a string that user type to find training program by name
- subscribers: how many people liked this program(int)
- id_training_type: what type of training is it(int)

## Exercise filter
```JSON
{
  "exercise_id": 1,
  "start_date":"2025-02-12 16:59:18",
  "end_date": "2025-02-13 16:59:18"
}
```

## Exercice stat
```JSON
{
  "weigth_done": 130.0,
  "count_done": 20,
  "date": "14.12.2020 02:43:12"
}
```

## Statistic for exercises
```JSON
{
  "statistics":
  [
    {
      "weigth_done": 130.0,
      "count_done": 20,
      "date": "14.12.2020 02:43:12"
    },
    {
      "weigth_done": 130.0,
      "count_done": 20,
      "date": "14.12.2020 02:43:13"
    },
    {
      "weigth_done": 130.0,
      "count_done": 20,
      "date": "14.12.2020 02:43:14"
    }
  ]
}
```

## History_exercise
```JSON
{
  "user_id": 12,
  "date": "14.12.2020 02:43:14",
  "name": "Жим штанги лёжа",
  "exercise_id": 1,
  "image": "https://example.com/images/bench_press.jpg",
  "process_video": "https://example.com/videos/bench_press.mp4",
  "recommended_weight": 30,
  "recommended_count": 10,
  "in_progress_ex": {
      "flag": true,
      "done_weight": 20,
      "done_count": 11,
      "diff_done_rec_w": -10,
      "diff_done_rec_c": 1
  }
}
```

## Best_Exercise
```JSON
{
  "exercise_id": 1,
  "name_exercise": "Bench press",
  "date": "14.12.2020 02:43:14",
  "done_weight": 20,
  "done_count": 11,
}
```

## Best_Exercises
```JSON
{
  "best_exercises": [
    {},
    {},
  ]
}
```

### Fields
- best_exercises: ans array of best_exercises

### statistics_user
```JSON
{
    "views": 1200,
    "friends": 60,
    "training_count": 15,
    "rating": 4.94,
    "avg_training_rating": 3.86,
    "reviews": [
      {
        "user_review": {
          "id": 1,
          "user_rating": 3.0,
          "rating": 5,
          "review": "not bad master"
        }
      }
    ]
}
```

#### Fields:
- views: Number of views for the user.
- griends: Number of friends.
- in_training: Number of users currently following the program.
- rating: Overall user rating.
- avg_training_rating: Average user's training rating
- reviews: Array of reviews.
  - user_review: Review object (see description above).

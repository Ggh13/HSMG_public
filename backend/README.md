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
- [Library](#library)
- Triaining
  - [Training](#training)
  - [Training_Process](#trainig_process)
  - [Training History](#training_history)
- User
  - [User](#user)
  - [Achievements](#achievements)
  - [Comunity](#comunity)
  - [Anthropometry](#anthropometry)
  - [Statistics](#statistics)
- Searching
  - [Searching trainings](#searching-trainings)
  - [Searching users](#searching-users)
  - [Favourite Training](#favourite-training)

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

## Library
#### Get Training exercises info from library GET ```/api/libraries/training_exercises/get/:training_exercise_id```
-   Request:
none
-   Response:
[Exercise_info_from_libraries](#Exercise_info_from_libraries)
[HTTP status](#http-status-200ok-400-500)

#### Get All Training exercises info from library GET ```/api/libraries/training_exercises/get_all```
-   Request:
none
-   Response:
[Exercises_info_from_libraries](#Exercises_info_from_libraries)
[HTTP status](#http-status-200ok-400-500)


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

#### Get Training Statistic GET ```/api/training_statistic/:training_id```
-   Request:
none
-   Response:
[training_stat](#statistics_training)

#### Get General Training info GET ```/api/searching_training/get/:training_id```
-   Request:
none
-   Response:
[General training info](#general-training-information)


## Trainig_process
#### Done exercise POST ```/api/training_process/done_exercise```
-   Request: Authorisation header with accessToken
[History_exercise](#history_exercise)
-   Response: 
[HTTP status](#http-status-200ok-400-500)

#### Add training programs to user training programs POST ```/api/training_process/add/:training_program_id```
-   Request:
JSON with Authorization header, where accessToken locate
-   Response: 
[HTTP status](#http-status-200ok-400-500)

#### Get training users chosen training programs GET ```/api/training_process/get```
-   Request:
JSON with Authorization header, where accessToken locate
-   Response:
[Training Programs](#general-information-training-programs)
[HTTP status](#http-status-200ok-400-500)

#### Get training program from user training programs GET ```/api/training_process/get/:training_program_id```
-   Request:
JSON with Authorization header, where accessToken locate
-   Response:
[Training Program](#training-1)
[HTTP status](#http-status-200ok-400-500)

#### Update training program from user training programs POST ```/api/training_process/update/:training_program_id```
-   Request:
[Training](#training-1)
JSON with Authorization header, where accessToken locate
-   Response: 
[HTTP status](#http-status-200ok-400-500)

## Training History
#### Training history GET ```/api/history/get_exercise_history/:user_id```
-   Request:
none
JSON with Authorization header, where accessToken locate
-   Response: 
[Training_history](#training_history)




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

#### Get user's training programs GET ```/api/training_constructor/user_trainings/:user_id```
-   Request:
none
-   Response:
[Training programs](#general-information-training-programs)
[HTTP status](#http-status-200ok-400-500)

#### Get user's Auth training programs GET ```/api/training_constructor/user_trainings```
-   Request:
JSON with Authorization header, where accessToken locate
-   Response:
[Training programs](#general-information-training-programs)
[HTTP status](#http-status-200ok-400-500)

## Achievements
#### To get possible achievements GET ```/api/achievements/best_aproaches```
-   Request:
Authorisation header with accessToken
-   Response:
[Best_Exercises](#best_exercises)

#### Create achievement POST ```/api/achievement/create```
-   Request:
Authorisation header with accessToken
JSON [Achievement](#achievement)
-   Response:
[HTTP status](#http-status-200ok-400-500)

#### To get authorised user's achievements GET ```/api/achievement/get```
-   Request:
none
-   Response: JSON [Achievements](#achievements)
[HTTP status](#http-status-200ok-400-500)

#### To get user's achievements GET ```/api/achievement/get/:id_user```
-   Request:
none
-   Response: JSON [Achievements](#achievements)
[HTTP status](#http-status-200ok-400-500)

#### To delete achievement DELETE ```/api/achievement/delete/:id_achievement```
-   Request:
Authorisation header with accessToken
-   Response:
[HTTP status](#http-status-200ok-400-500)


## Anthropometry

#### Set Current Anthropometry PUT ```/api/anthropometry/set```
-   Request:
[Anthropometry](#anthropometry-1)
JSON with Authorization header, where accessToken locate
-   Response:
[HTTP status](#http-status-200ok-400-500)

#### Delete Current Anthropometry DELETE ```/api/anthropometry/delete```
U can delete current anthropometry only 24Hours later last anthropometry set? otherwise u get 203.
-   Request:
JSON with Authorization header, where accessToken locate
-   Response:
[HTTP status](#http-status-200ok-400-500)

#### Get Current Anthropometry GET ```/api/anthropometry/:user_id```
-   Request:
none
-   Response:
[Anthropometry](#anthropometry-1)
[HTTP status](#http-status-200ok-400-500)

#### Get Acnthropometry Statistic POST ```/api/anthropometry/statistic/:user_id```
-   Request:
none
-   Response:
[Anthropometry_stat](#anthropomery_stat)


## Statistics

#### Set Current Anthropometry POST ```/api/statistic/get/exercises```
-   Request:
[Statistic_json_request](#statistic_json_request)
-   Response:
[Statistic_json_response](#statistic_json_response)



## Searching users
#### Find people POST ```/api/find_people```
- Request:
[User_filter](#user-filter)
- Response:
[Users](#users_with_friend_status)
[HTTP status](#http-status-200ok-400-500)

#### Find people POST ```/api/auth/find_people```
- Request:
JSON with Authorization header, where accessToken locate
[User_filter](#user-filter)
- Response:
[Users](#users_with_friend_status)
[HTTP status](#http-status-200ok-400-500)

## Comunity
#### Add Friends PUT ```/api/comunity/add/:user_id```
- Request:
JSON with Authorization header, where accessToken locate
- Response:
[HTTP status](#http-status-200ok-400-500)

#### Delete from Friends DELETE ```/api/comunity/delete/:user_id```
- Request:
JSON with Authorization header, where accessToken locate
- Response:
[HTTP status](#http-status-200ok-400-500)

#### Get Friends GET ```/api/comunity/get```
- Request:
JSON with Authorization header, where accessToken locate
- Response:
[users](#users)


## Searching trainings
#### Find training POST ```/api/searching_training/find```
- Request:
[Training Filter](#training-filter) - Some fields can be missing 
- Response:
[Training programs](#general-information-training-programs)
[HTTP status](#http-status-200ok-400-500);

#### Get General Info training GET ```/api/searching_training/get/:training_id```
- Request:
none
- Response:
[Training program](#general-training-information)
[HTTP status](#http-status-200ok-400-500);

## Favourite training
#### Add training program to favourite PUT ```/api/training_favourite/add/:id_program```
- Request:
JSON with Authorization header, where accessToken locate
- Response:[HTTP status](#http-status-200ok-400-500);

#### Delete training program from favourite DELETE ```/api/training_favourite/delete/:id_program```
- Request:
JSON with Authorization header, where accessToken locate
- Response:[HTTP status](#http-status-200ok-400-500);

#### Get favourite training programs GET  ```/api/training_favourite/get```
- Request:
JSON with Authorization header, where accessToken locate
- Response:
[Training programs](#general-information-training-programs)

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
-   [**User**](#user-1)
    -   [Social media](#social_media)
    -   [User review](#social_media)
    -   [User register](#user_register)
    -   [User authorisation](#user_auth)
    -   [Users](#users)
    -   [Users with friend status](#user_with_friends_status)

-   [**Achievements**](#achievements-1)
    -   [Achievement](#achievement)

-   [**Training_History**](#history_exercise)

-   [**Reviews and rating**]()
    -   [User review](#social_media)
    -   [User Stats](#statistics_user)

-   [**Anthrophometry**](#anthropometry-1)
    - [Anthropometry_stat](#anthropomery_stat)

-   [**Training**](#training-1)
    -   [Generl training information](#general-training-information)
    -   -   [Training_programs](#general-information-training-programs)
    -   [Statistic training](#statistics_training)
    -   [In progres](#in_progress)
    -   [Author](#user)
    -   [Training day](#training_day)
        -   [Exercises](#exercise)
            -   [Approach](#approach)
                -   [In progrss Exercise](#in_progress_ex)

-   **Filters**
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

## user_with_friends_status
```JSON
{
  "user": {},
  "is_friend": true,
}
```

## Fields
- user: default [user](#user-1) json
- is_frined: flag that indicates, is user a friend

## Fields
- users: an array of user

## users_with_friend_status
```JSON
{
  "users_with_friends_status": [
    {},
    {},
  ]
}
```

## Fields
- users: an array of [user_with_friends_status](#user_with_friends_status)

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
    "reviews_count": 1,
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

  "flag": true,

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

    "flag": true,

    "exercises": [
    {
        "name": "Жим штанги лёжа",
        "exercise_id": 1,
        "description": "Основное упражнение для развития грудных мышц.",
        "image": "https://example.com/images/bench_press.jpg",
        "example_exercise": "https://example.com/videos/bench_press.mp4",

        "flag": true,

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

  "training_days": [
    {
      "name": "День 1: Тренировка груди и трицепса",
      "description": "Базовая тренировка для развития мышц груди и трицепса.",
      "image": "https://example.com/images/day1.jpg",
      "week_day": "wednesday",

      "flag": true,

      "exercises": [
        {
          "name": "Жим штанги лёжа",
          "exercise_id": 1,
          "description": "Основное упражнение для развития грудных мышц.",
          "image": "https://example.com/images/bench_press.jpg",
          "example_exercise": "https://example.com/videos/bench_press.mp4",

          "flag": true,

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
  "version": 0,
  "type": "BodyBuilding",
  "name": "top of the top",
  "description": "Программа тренировок для начинающих, направленная на развитие силы и выносливости.",
  "image": "https://example.com/images/training_program_1.jpg",
  "price": 1200,

  "statistics_training": 
  {
      "views": 1200,
      "favourite": 60,
      "in_training": 15,
      "rating": 4.94,
      "reviews_count": 1,
      "reviews": []
  },

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
- training_programs: an array of [General_training_information](#general-training-information)

## achievement
```JSON
{
  "id":                 1,
  "exercise_id":        3,
  "name_exercise":      "bench press",
  "image":              "https://url",
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
  "date":             "2025-05-13T13:53:06.945266Z"
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
  "anthropomery_stat": {
    {},
    {},
  }
}
```

### Fields 
- anthropomery_stat: an array of anthropomery

## Anthropometry Filter
```JSON
{
  "start_date":"2025-02-12 16:59:18",
  "end_date": "2025-02-13 16:59:18"
}
```
### Fields
-   start_date: date since we want to know statistic
-   end_date: date until we want to know statistic


## User Filter
```JSON
{
  "search_bar": "Test",
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
  "rating": 4.3,
  "favourite_cnt": 2,
  "id_training_type": 3,
  "price_min": -1,
  "price_max": 100000,
  "views_min": 0,
  "in_training_cnt": 0
}
```

### Fields
- search_bar: a string that user type to find training program by name
- rating: float type, rating of training program
- favourite_cnt: how many people liked this program(int)
- id_training_type: what type of training is it(int)
- in_training_cnt: number of people who training with this program

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

## History_exercise
```JSON
{
  "name": "Жим штанги лёжа",
  "exercise_id": 1,
  "image": "https://example.com/images/bench_press.jpg",
  "process_video": "https://example.com/videos/bench_press.mp4",
  "approach": {
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
}
```

## Best_Exercise
```JSON
{
  "exercise_id": 1,
  "name_exercise": "Bench press",
  "date": "2025-05-16T18:10:47.001512+03:00",
  "done_weight": 20,
  "done_count": 11,
  "image" : "url",
  "viceo_record": "url
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

### Exercises_info_from_libraries
```JSON
{
    "exercises": [
        {
            "id": 1,
            "name": "1",
            "link_video": "3"
        }
    ]
}
```

### Exercise_info_from_libraries
```JSON
 {
   "id": 1,
   "name": "1",
   "link_video": "3"
 }
```

### Training_history
```JSON
 [
    {
        "Training_ex": {
            "name": "Жим штанги лежа",
            "exercise_id": 2,
            "description": "",
            "image": "",
            "example_exercise": "",
            "approaches": [
                {
                    "recommended_weight": 0,
                    "recommended_count": 0,
                    "in_progress_ex": {
                        "flag": false,
                        "done_weight": 4,
                        "done_count": 45,
                        "diff_done_rec_w": 0,
                        "diff_done_rec_c": 0
                    }
                }
            ]
        },
        "date": "2025-05-04 18:56:35.940145+03"
    }
 ]
```

### Statistic_json_request
```JSON
 {
  "user_id": 22,
  "id_exercise": 2
}
```


### Statistic_json_response
```JSON
{
    "data": {
        "2025-04-04 00:00:00": 66,
        "2025-05-01 00:00:00": 45,
        "2025-05-04 00:00:00": 4
    }
}
```

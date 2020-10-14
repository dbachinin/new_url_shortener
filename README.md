# README

* This application needed rails 6.0, ruby 2.6.3 and mongodb >= 4.4.
* After deploy you see field where you can input or paste full you link. And after these you can see you shortening link under input field.
![alt text](https://github.com/dbachinin/new_url_shortener/blob/master/Screenshot_20201014_194603.png "Screenshot")

================
# For use as an API

* You can send GET request to `/urls/:short_url` — where :short_url is last 5 characters from shortening URL to get given URL.
Or
* You can send GET request to `/urls/:short_url/stat`— where :short_url is last 5 characters from shortening URL and get count times of redirect to given URL.
* You can send POST request to `/urls` with params like as `{"link"=>{"given_url"=>"https://ya.ru"}}` and get you shortening URL.

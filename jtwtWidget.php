<?php
/**
 * jtwt SilverStripe widget - Shows latest tweets
 *
 * jtwt.js - a simple jQuery plugin for the twitter JSON API: http://jtwt.hrbor.com/
 */

class JtwtWidget extends Widget {

    static $title = "Latest Tweets";
    static $cmsTitle = "Latest Tweets Widget";
    static $description = "This widget shows your latest tweets";

    static $db = array(
        "WidgetTitle" => "Varchar(255)",
        "Username" => "Varchar(255)",
        "NumberToShow" => "Int",
        "AvatarWidth" => "Int",
        "LoaderText" => "Varchar(255)"
    );

    static $defaults = array(
        "WidgetTitle" => "Latest Tweets",
        "Username" => "_mattbailey",
        "NumberToShow" => 5,
        "AvatarWidth" => 48,
        "LoaderText" => "Loading tweets..."
    );

    public function getCMSFields() {
        return new FieldList(
            new TextField('WidgetTitle', 'Widget Title'),
            new TextField('Username', 'Twitter Username'),
            new NumericField("NumberToShow", "Number of Tweets"),
            new NumericField("AvatarWidth", "Width of Avatar"),
            new TextField('LoaderText', 'Loader Text')
        );
    }

    public function Title() {
        return $this->WidgetTitle ? $this->WidgetTitle : self::$title;
    }

    public function getLatestTweets() {

        Requirements::javascript("widget_jtwt/js/jtwt.min.js");
        Requirements::css("widget_jtwt/css/jtwt.css");

        $output = new ArrayList();
        $output->push(new ArrayData(array(
            "Username" => $this->Username,
            "NumberToShow" => $this->NumberToShow,
            "AvatarWidth" => $this->AvatarWidth,
            "LoaderText" => $this->LoaderText
        )));
        return $output;
    }

}

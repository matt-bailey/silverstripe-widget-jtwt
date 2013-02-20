<% if LatestTweets %>
<% control LatestTweets %>
<script type="text/javascript">
    $(window).load(function() {
        jQuery(".twitter").jtwt({
            count: $NumberToShow,
            username: "$Username",
            image_size: $AvatarWidth,
            loader_text: "$LoaderText"
        });
    });
</script>
<div class="twitter"></div>
<% end_control %>
<% end_if %>

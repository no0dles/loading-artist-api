CREATE TABLE IF NOT EXISTS `comics` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `thumb_url` varchar(255) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `comic_id` (`id`),
  UNIQUE KEY `comic_url` (`url`),
  UNIQUE KEY `comic_img_url` (`img_url`),
  UNIQUE KEY `comic_thumb_url` (`thumb_url`)
);
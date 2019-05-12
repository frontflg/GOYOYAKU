CREATE TABLE `reserve_tbl` (
  `reserveid` VARCHAR(9) NOT NULL COLLATE 'utf16_unicode_520_ci',
  `reservedate` DATE NOT NULL,
  `visitdate` DATE NULL DEFAULT NULL,
  `visittime` TIME NULL DEFAULT NULL,
  `status` TINYINT(4) NULL DEFAULT '0',
  `customer` VARCHAR(100) NOT NULL COLLATE 'utf16_unicode_520_ci',
  `delegate` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `telnum` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `postnum` VARCHAR(8) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `address` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `email` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `reservenum` INT(11) NULL DEFAULT '1',
  `order1` VARCHAR(4) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `ordernum1` INT(11) NULL DEFAULT '0',
  `order2` VARCHAR(4) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `ordernum2` INT(11) NULL DEFAULT NULL,
  `order3` VARCHAR(4) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `ordernum3` INT(11) NULL DEFAULT NULL,
  `order4` VARCHAR(4) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `ordernum4` INT(11) NULL DEFAULT NULL,
  `order5` VARCHAR(4) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `ordernum5` INT(11) NULL DEFAULT NULL,
  `response` TINYINT(4) NULL DEFAULT '0',
  `evaluation` TINYINT(4) NULL DEFAULT '0',
  `remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `receptdate` DATETIME NULL DEFAULT NULL,
  `receptionist` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  PRIMARY KEY (`reserveid`)
)
COMMENT='レストラン予約システム予約テーブル'
COLLATE='utf16_unicode_520_ci'
ENGINE=InnoDB
;
CREATE TABLE `course_mst` (
  `courseid` VARCHAR(4) NOT NULL COLLATE 'utf16_unicode_520_ci',
  `coursename` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `description` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `courseimg` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `unitprice` INT(11) NULL DEFAULT '0',
  `setnum` INT(11) NULL DEFAULT '1',
  `delflg` TINYINT(4) NULL DEFAULT '0',
  `remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf16_unicode_520_ci',
  `credate` DATE NULL DEFAULT NULL,
  `deldate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`courseid`)
)
COMMENT='レストラン予約コースマスター'
COLLATE='utf16_unicode_520_ci'
ENGINE=InnoDB
;

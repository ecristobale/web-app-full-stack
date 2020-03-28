package com.ecristobale.spring.boot.apirest.auth;

public class JwtConfig {

	public static final String SECRET_KEY = "some.important.key.1234567";
	
	public static final String PRIVATE_RSA = "-----BEGIN RSA PRIVATE KEY-----\r\n" + 
			"MIIEowIBAAKCAQEAw3ryNOEJQfzs9WoHUyVyoKaIXCBe2V312d1EgmuVsMYzgiCi\r\n" + 
			"Gs/mq3x/X/tsZFPOL0ZCDiEiQ1kIidlAGt+AjWlzIIJRi1kG7/z3zIX+/+wY7Jxs\r\n" + 
			"3syG2g8RKRQ1Bp49S5enaHQk1YHc9lWYwS/EDUNVhpGIz30QLaJFZHmvrCZo05Ah\r\n" + 
			"DZo6gC2XUrZvrscgXJ2cEEX7ez4MeHaAg3y9gSbtTjD5Md2kl/TXEasVOHJtg8Cr\r\n" + 
			"dQDBJYiU0GN2C2r2voEfR/688GSmVfQnsTJSUtyK+WqqH1au9kG282DHYgPWEKRo\r\n" + 
			"nRcVxwOsNen/tE8A8/SUjBGz3mWbNbZ1SleqsQIDAQABAoIBAQCywYkfZfHrT/j4\r\n" + 
			"at8L36C029SyOj/CEjQx6C8v/GXEY1rS0jiqwBc2FgD8qpPyItjXTi41cYM9hvtR\r\n" + 
			"40LF0EBkEFvhDIq5HM5FQ1TuyFHpgeNA68J68xkV6tVMdVgQF0ACEkpaMGtGexyu\r\n" + 
			"fpPThXSIlFxvVEKBSuIyeMNwH/7PMi8SRFBdRIra1AvAzp+dTB9su47nPEUy3rJZ\r\n" + 
			"CYCkyX4vTYiahgzAZ9OLz+gprMcsxZqF8R+TfWKhGg53J7G5VGDGCxqLLCjBvhd8\r\n" + 
			"4Z3qzc+Yt+mt8vsiH4OHg8mxt2zOSWQXOV/6VGdrlQw7/DvOKb3YlDVoDus0RHCV\r\n" + 
			"v5BPN3aBAoGBAOiwIAq6IoMz+4T6au+fs1+18fW4/LvlzRXilodp/+LrmuVqz4OS\r\n" + 
			"RxqqPqTfVKiLj9xBgV5Sp+A5QXDqzFGdPmyjz3vp8GX+j1PJiSaPL/RAO8LrEQoI\r\n" + 
			"IIgV/CQ6Fj/mGxZyK3BSKxjHmd92ozDDqK92vXbLCRZwNYIe5CYWMcGZAoGBANcQ\r\n" + 
			"iL2QHNckJjg45Y0dB4y0QjocbSMNhI5tOfyTUIkcooaVyaO6yZXQV5ih8XkmhW5t\r\n" + 
			"/7/vuVlbFOG/2p0Q4XXjlxMUE5pEK4Tj2Gxxhd0+/tmc9elwUL125KCMiVq8Rgf8\r\n" + 
			"mKtAHOiE/Fxjyv2/QRa1uG+ssv9FkxXpBS87ORDZAoGAKg4zLF0qAbayff1YuIiP\r\n" + 
			"vfu/iJ7vpvJI1+zFMiJZamUU8OQWL3yPt2UPv3LR9UiMLs30GN0tlFwk1MjLNvEJ\r\n" + 
			"qE8PICFPHtAcjZM+Y6a7jxTQ+FDOGpcPcikvEkkhXlkziiIGcd2YBnmE+RuTMSwb\r\n" + 
			"3+LBKahWsySCt0roB245ffkCgYBbrJCdPXENxDsGfDpdjKJLOAuC+dsLthdrHuQ4\r\n" + 
			"5hLOX4ZoGDF7uYN0ePrd9SoZmnIGQJ1kE6vOiyS7lix6B1gUCI+9cjFo8OYcH4OB\r\n" + 
			"tmJ5jQDVgjLQ7y97k9KhHUbvhpHTlbj+RrYL56QrPd6pi30TUSLtd5BVgDLShCHR\r\n" + 
			"oE0TAQKBgDt4Vx7GGwDbXYUZQ1K2DtMvb/jpQTcHHyszzBHwNGOblIVhfM1lpe/N\r\n" + 
			"zQNGXVOiu+LvSyvNuA36mru5LJb8CXEzg/NhV+myXsAnurs0jNMJHqR+dc1pC3ze\r\n" + 
			"SiWUH4cUEL69vjoFLz5DmLYaqUXQnqnatDPv1cX6sYXVsKp3MqTG\r\n" + 
			"-----END RSA PRIVATE KEY-----";
	
	public static final String PUBLIC_RSA = "-----BEGIN PUBLIC KEY-----\r\n" + 
			"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw3ryNOEJQfzs9WoHUyVy\r\n" + 
			"oKaIXCBe2V312d1EgmuVsMYzgiCiGs/mq3x/X/tsZFPOL0ZCDiEiQ1kIidlAGt+A\r\n" + 
			"jWlzIIJRi1kG7/z3zIX+/+wY7Jxs3syG2g8RKRQ1Bp49S5enaHQk1YHc9lWYwS/E\r\n" + 
			"DUNVhpGIz30QLaJFZHmvrCZo05AhDZo6gC2XUrZvrscgXJ2cEEX7ez4MeHaAg3y9\r\n" + 
			"gSbtTjD5Md2kl/TXEasVOHJtg8CrdQDBJYiU0GN2C2r2voEfR/688GSmVfQnsTJS\r\n" + 
			"UtyK+WqqH1au9kG282DHYgPWEKRonRcVxwOsNen/tE8A8/SUjBGz3mWbNbZ1Sleq\r\n" + 
			"sQIDAQAB\r\n" + 
			"-----END PUBLIC KEY-----";
}

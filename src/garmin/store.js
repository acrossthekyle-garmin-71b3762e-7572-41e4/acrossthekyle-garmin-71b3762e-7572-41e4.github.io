export const apps = [
  {
    name: 'Barometer Widget',
    snippet: "See the current barometric pressure, where it's been, and where it might be going.",
    type: 'widget',
    cost: 5.00,
    key: 'barometer',
    trial: 7,
    url: 'https://apps.garmin.com/en-US/apps/7b673a6e-bda7-4711-87a3-0f1dad28db09',
    description: [
      "This widget shows the current (Mean Sea Level) barometric pressure using the built-in barometer sensor, along with a gauge. A historical trend is shown via an arrow below the gauge. Arrow indicates falling, rising, or steady, pressure conditions. A graph is also available showing the data for the last X hours (depends on device size). The third screen will show the current local (ambient) pressure.",
      "There is also a 'Storm Alert' feature that will alert you if the pressure is dropping by an amount that is greater than specified in the Settings (see Settings, off by default). This is a new/experimental feature.",
      "You can also change most of the settings from the device Menu (device dependent).",
      "Enjoy all of these features, for free, during the trial period which lasts for 7 days. Once the trial period ends you will need to purchase an Unlock Code."
    ],
    features: [
      'Barometric Trend',
      'Beautiful history graph',
      'View Storm Alert rate-of-change (open Menu on graph screen)',
      'Storm Alert for pressure drops',
      'On-device setting adjustment from main screen (open Menu)',
      'Supports 30+ languages'
    ],
    settings: [
      'Unit of Measurement',
      'Toggle Storm Alert',
      'Set Storm Alert rate-of-change',
      'Toggle haptic feedback via vibrations',
      'Toggle screen transitions',
      'Toggle history graph normalization',
      'See the current unlock status'
    ]
  },
  {
    name: 'Compass (ABC) Widget',
    snippet: "Find North, see a snapshot of elevation history, or calculate a degrees deviation.",
    type: 'widget',
    cost: 5.00,
    key: 'compass',
    trial: 7,
    url: 'https://apps.garmin.com/en-US/apps/184d806a-e425-403e-b142-9d63e0abaf14',
    description: [
      "This widget shows the current degree heading along with altitude and barometric pressure trend, the altitude history, barometer history, current Lat/Long location along with GPS signal strength (blue means it is using the last known GPS location), and a dedicated compass screen for doing deviation.",
      "The screen showing degrees and N.E.S.W. letters below degrees allows for Deviation. For touchscreen devices tap on the screen, and for devices with 5 buttons press the Start button, to enter/exit deviation mode.",
      "Settings exist for fine-tuning the experience including adjusting for declination.",
      "Enjoy all of these features, for free, during the trial period which lasts for 7 days. Once the trial period ends you will need to purchase an Unlock Code."
    ],
    features: [
      'Current heading in degrees',
      'Current altitude',
      'Barometric trend',
      'Beautiful history graphs for elevation and barometric pressure',
      'Calculate deviation degrees',
      'See current coordinates in multiple formats along with GPS strength',
      'View ambient (local) pressure on barometric graph screen (open Menu)',
      'On-device setting adjustment from main screen (open Menu)',
      'Supports 30+ languages'
    ],
    settings: [
      'Toggle the showing of altitude unit of Measurement',
      'Altitude Unit of Measurement',
      'Barometric Pressure Unit of Measurement',
      'Coordinates format',
      'Set degree declination (adjustment)',
      'Customize the compass color',
      'Toggle haptic feedback via vibrations',
      'Toggle screen transitions',
      'Toggle history graph normalization',
      'See the current unlock status'
    ]
  },
  {
    name: 'Elevation Widget',
    snippet: "View the current altitude and estimated oxygen, along with a historical snapshot.",
    type: 'widget',
    cost: 5.00,
    key: 'elevation',
    trial: 7,
    url: 'https://apps.garmin.com/en-US/apps/ae525b97-3538-47b8-bef4-6920894c572f',
    description: [
      "This widget shows the current altitude using either the built-in sensor, or GPS (whichever has better accuracy/availability). It will also show estimated Effective Oxygen at the given altitude. A graph is also available showing the data for the last X hours (depends on device size).",
      "Enjoy all of these features, for free, during the trial period which lasts for 7 days. Once the trial period ends you will need to purchase an Unlock Code."
    ],
    features: [
      'Current altitude',
      'Beautiful history graph',
      'View total ascent/descent on graph screen (open Menu)',
      'Estimated effective oxygen',
      'A.M.S. Warning on oxygen screen',
      'On-device setting adjustment from main screen (open Menu)',
      'Supports 30+ languages'
    ],
    settings: [
      'Toggle the showing of unit of Measurement',
      'Unit of Measurement',
      'Toggle A.M.S. Warning',
      'Toggle haptic feedback via vibrations',
      'Toggle screen transitions',
      'Toggle history graph normalization',
      'See the current unlock status'
    ]
  },
  {
    name: 'Heart Rate Widget',
    snippet: "Check the current heart rate, what it is when it's resting, and see its history.",
    type: 'widget',
    cost: 5.00,
    key: 'heart_rate',
    trial: 7,
    url: 'https://apps.garmin.com/en-US/apps/e28dffc6-f1c7-49b4-ab49-85766c65bbb2',
    description: [
      "This widget shows the current heart rate using the built-in sensor (along with a ring of zones), the seven-day average resting heart rate, and an approximation of the HRV based on the heart beat intervals (in milliseconds) updated every four seconds (also depends on devices supporting CIQ 3.0.0 or higher). A graph is also available showing the data for the last X hours (depends on device size).",
      "Enjoy all of these features, for free, during the trial period which lasts for 7 days. Once the trial period ends you will need to purchase an Unlock Code."
    ],
    features: [
      'Current heart rate',
      'Beautiful history graph',
      'Seven day average resting rate',
      'HRV (estimated)',
      'On-device setting adjustment from main screen (open Menu)',
      'Supports 30+ languages'
    ],
    settings: [
      'Set heart rate adjustment if the heart rate reading feels too high or too low',
      'Toggle haptic feedback via vibrations',
      'Toggle screen transitions',
      'Toggle history graph normalization',
      'See the current unlock status'
    ]
  },
  {
    name: 'Sun Times Widget',
    snippet: "Know when the sun will set and rise, or when astronomical twilight will happen.",
    type: 'widget',
    cost: 5.00,
    key: 'sun_times',
    trial: 7,
    url: 'https://apps.garmin.com/en-US/apps/f54aaac0-ee50-4b46-a062-60c91fecd359',
    description: [
      "This widget is inspired by the Sun Times widget found on newer Garmin watches.",
      "Shows the Sunrise/Sunset, along with Twilight (dawn/dusk), in a circle with color segments showing the various stages. Settings exist for fine-tuning the experience, check them out! You can also set your default location using latitude and longitude values such as 34.052235 and -118.243683 if no GPS is available (found in Settings).",
      "Enjoy all of these features, for free, during the trial period which lasts for 7 days. Once the trial period ends you will need to purchase an Unlock Code."
    ],
    features: [
      'View sunrise/sunset times',
      'View a variety of twilight (dawn/dusk) times',
      'Go forwards/backwards in time',
      'On-device setting adjustment from main screen (open Menu)',
      'Supports 30+ languages'
    ],
    settings: [
      'Toggle using GPS location',
      'See what source is used for the location',
      'Toggle displaying the Hours on the dial',
      'Toggle displaying twilight times',
      'Toggle displaying the "next event"',
      'Configure the format of the times',
      'Toggle displaying markers on the dial for the various kinds of twilight',
      'Configure twilight levels',
      'Toggle haptic feedback via vibrations',
      'Toggle screen transitions',
      'Toggle history graph normalization',
      'See the current unlock status'
    ]
  },
  {
    name: 'Temperature Widget',
    snippet: "Measure the temperature of the air, any surface, or an estimation of your core temperature.",
    type: 'widget',
    cost: 5.00,
    key: 'temperature',
    trial: 7,
    url: 'https://apps.garmin.com/en-US/apps/0398a4db-a4ee-49f4-aca3-e380b93dba45',
    description: [
      "This Temperature widget shows the current (approximate) external temperature using the built-in sensor, along with a thermometer showing the degrees. It will show 'AIR TEMPERATURE' when not worn on the wrist (leave it off of the wrist for ~10-15 minutes to get a somewhat accurate reading), and 'SKIN TEMPERATURE' when worn on the wrist. Core temperature is an estimation using the skin temperature reading. A graph is also available showing the data for the last X hours (depends on device size).",
      "Enjoy all of these features, for free, during the trial period which lasts for 7 days. Once the trial period ends you will need to purchase an Unlock Code."
    ],
    features: [
      'Current temperature of the air or of a surface',
      'Beautiful history graph',
      'Estimated core body temperature (when worn on wrist)',
      'On-device setting adjustment from main screen (open Menu)',
      'Supports 30+ languages'
    ],
    settings: [
      'Configure unit of measurement',
      'Set core body temperature degrees adjustment',
      'Toggle haptic feedback via vibrations',
      'Toggle screen transitions',
      'Toggle history graph normalization',
      'See the current unlock status'
    ]
  }
];

export const bundles = [
  {
    name: 'All 6 Widgets',
    key: 'all',
    cost: 30.00,
    sale: 24.00
  },
];

export const pages = [
	{
		name: 'Home',
		title: '',
		key: 'home',
    path: '/garmin'
	},
	{
		name: 'Apps',
		title: 'Apps',
		key: 'apps',
    path: '/garmin/apps'
	},
	{
		name: 'Purchase',
		title: 'Purchase an Unlock Code',
		key: 'purchase',
    path: '/garmin/purchase'
	},
	{
		name: 'Donate',
		title: 'Donate and Support My Work',
		key: 'donate',
    path: '/garmin/donate'
	},
	{
		name: 'Help',
		title: 'Help',
		key: 'help',
    path: '/garmin/help'
	}
];

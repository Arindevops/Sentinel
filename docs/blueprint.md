# **App Name**: Industrial Sentinel

## Core Features:

- Data Ingestion: Upload equipment sensor data in Excel format.
- Anomaly Detection: Detect anomalies in real-time sensor data using IsolationForest and rule-based thresholds. Configurable contamination for IsolationForest.
- Failure Prediction: Predict equipment failures using a HistGradientBoostingClassifier trained on time-series data. Class weights are balanced.
- Maintenance Scheduling: Suggest optimal maintenance schedules considering cost, equipment priority and remaining useful life (RUL).
- Real-time Dashboard: Display equipment health status, anomaly scores, and failure predictions on a live dashboard.
- Threshold Configuration: Admins should be able to tune and configure anomaly detection algorithm settings, such as z-score thresholds per sensor type.
- Data Simulation: The app includes an internal tool for simulating sensor and maintenance data for development and testing. Data should reflect equipment maintenance history, failure records, equipment specification and operating parameters

## Style Guidelines:

- Primary color: Dark purple (#3F51B5), conveying trust and reliability.
- Background color: Very light purple (#E8EAF6), providing a clean, professional backdrop.
- Accent color: Orange (#FF9800), used to highlight key metrics and call-to-action buttons, symbolizing action and alerting users.
- Body and headline font: 'Inter', a grotesque sans-serif with a modern, neutral look. Suitable for both headlines and body text.
- Use flat, modern icons to represent equipment status and maintenance actions.
- Dashboard layout: Card-based layout for key metrics, time series charts for sensor data, and tabular data for maintenance schedules.
- Subtle transitions and animations to indicate changes in equipment status and data updates.
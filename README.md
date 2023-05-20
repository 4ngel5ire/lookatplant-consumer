This is the consumer application of LOOKATPLANT

Consumes from kafka topic with below message structure and makes http rest request to
`https://my-api.plantnet.org/v2/identify`

Persists resutls to assosciated plant table (single record per plant_id), user table (single record per user_id), and historical user_plant table maintaining record of associated user plant identifications

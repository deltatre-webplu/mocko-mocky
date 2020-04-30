# mocko-mocky

mocko-mocky is a server useful to mock API responses for testing purposes or whatever your fantasy can unleash

## Requirements

- node >= 12.x

## Usage

Once running mocko-mocky will expose to you the endpoint `/request` both in `GET` and `POST`

You can provide three query string parameters using both method:

- `status`: the status code desired in the response (default `200`)
- `delay`: the time in milliseconds to wait before response is sent to the client (default `0`)
- `timeout`: the server timeout in milliseconds after which a `408 Timeout` response is sent to the client (disabled by default)

Using the `POST` method you can provide a body and a set of headers that you need to be returned to the client in the response. This is expected shape of the request body:

	{
		"headers": {
			"header-key-1": "header-value-1",
			"header-key-2": "header-value-2",
			"header-key-3": "header-value-3",
			...
		},
		"body": {
			"foo": "bar",
			"baz": {
				"awesome-thing": "mocko-mocky",
				...
			}
		}
	}





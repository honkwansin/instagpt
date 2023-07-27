# InstaGPT

InstaGPT is a program that leverages ChatGPT for your instagram inbox with user-defined answers to incoming questions. The program uses a React user interface connected with a Python backend that uses selenium to scrape incoming messages from your Instagram inbox.

## Requirements
- Python3
- pip3
- npm
## Installation

1. Clone the repository.

```bash
git clone git@github.com:honkwansin/instagpt.git
```

2. In root directory, run:
```bash
npm install
```
And
```bash
pip3 install -r requirements.txt
```
This will install all the dependencies.

## Usage
1. In root directory, run:
```bash
python3 backend.py
```
And then:
```bash
npm start
```

This will start the python backend and the React frontend. A browser user interface should now appear. Follow the instruction on screen.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
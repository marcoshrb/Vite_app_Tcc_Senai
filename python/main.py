import api
import argparse
import os
import signal
import threading

from config import Config

parser = argparse.ArgumentParser()
parser.add_argument('-p', '--port', default=8080)
parser.add_argument('-c', '--config', default='.config')

if __name__ == '__main__':
    args = parser.parse_args()

    Config.load((args.config 
                 if os.path.exists(args.config) 
                 else 'default.config'))

    api_thread = threading.Thread(target=api.run, args=(args.port,))
    api_thread.start()

    try:
        from app import main
    except Exception as e:
        raise e
    finally:
        Config.save(args.config)
        os.kill(os.getpid(), signal.SIGTERM)
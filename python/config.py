import json
import threading

class Config:
    __config = {}
    __lock = threading.Lock()

    def __init__(self, section:str) -> None:
        self.__section = section
        with self.__lock:
            if section not in self.__config:
                self.__config[section] = {}

    def __getitem__(self, keys):
        with self.__lock:
            if not isinstance(keys, tuple):
                return self.__config[self.__section][keys]
            value = self.__config[self.__section]
            for key in keys:
                value = value[key]
            return value

    def __setitem__(self, keys, value):
        with self.__lock:
            if not isinstance(keys, tuple):
                keys = (keys,)
            temp_keys = []
            field = self.__config
            for key in (self.__section,) + keys[:-1]:
                if not isinstance(field, dict):
                    new_field = self.__config
                    for k in temp_keys[:-1]:
                        new_field = new_field[k]
                    new_field[temp_keys[-1]] = {}

                if key not in field:
                    field[key] = {}

                temp_keys.append(key)
                field = field[key]

            field[keys[-1]] = value

    @classmethod
    def save(cls, file_path:str):
        with cls.__lock:
            with open(file_path, 'w') as file:
                json.dump(cls.__config, file, indent=4)

    @classmethod
    def load(cls, file_path:str):
        with cls.__lock:
            with open(file_path, 'r') as file:
                cls.__config = json.load(file)

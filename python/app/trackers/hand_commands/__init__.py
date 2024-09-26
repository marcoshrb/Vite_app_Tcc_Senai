import os
import pkgutil

package_dir = os.path.dirname(__file__)

modules = [name for _, name, _ in pkgutil.iter_modules([package_dir])]

__all__ = []

for module_name in modules:
    module = __import__(f'{module_name}', locals(), globals(), level=1)
    __all__.extend(getattr(module, '__all__', []))
import logging
from logging.handlers import TimedRotatingFileHandler
import os

# Get the current working directory
current_directory = os.getcwd()

# Specify the log file name
info_log_file_name = 'info.log'
error_log_file_name = 'error.log'

# Create the full path to the log file
error_log_file_path = os.path.join(current_directory, error_log_file_name)
info_log_file_path = os.path.join(current_directory, info_log_file_name)

# Set up loggers
info_logger = None
error_logger = None

previous_errors = {}
class PreviousErrorFilter(logging.Filter):
    def filter(self, record):
        if record.levelno == logging.ERROR:
            msg = record.msg
            if msg in previous_errors:
                return False # Ignore duplicate errors
            else:
                previous_errors[msg] = True
            return True 

def setup_info_logger(log_file_path):
    if not os.path.isfile(log_file_path):
        with open(log_file_path, 'w'):
            pass  # Creates an empty file
        
    info_logger = logging.getLogger('info_logger')
    info_logger.setLevel(logging.INFO)
    info_handler = TimedRotatingFileHandler(
        filename=log_file_path,
        when='D',
        interval=1,
        backupCount=5,
        encoding='utf-8',
        delay=False
    )
    info_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    info_handler.setFormatter(info_formatter)
    info_logger.addHandler(info_handler)
    return info_logger

def setup_error_logger(log_file_path):
    if not os.path.isfile(log_file_path):
        with open(log_file_path, 'w'):
            pass  # Creates an empty file

    error_logger = logging.getLogger('error_logger')
    error_logger.setLevel(logging.ERROR)
    error_handler = TimedRotatingFileHandler(
        filename=log_file_path,
        when='D',
        interval=1,
        backupCount=5,
        encoding='utf-8',
        delay=False
    )
    error_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    error_handler.setFormatter(error_formatter)
    # error_logger.addFilter(PreviousErrorFilter())
    error_logger.addHandler(error_handler)
    return error_logger


# def check_error_log_size(log_file_path):
#     # Check if the error log file exceeds 200 MB
#     if os.path.exists(log_file_path):
#         file_size = os.path.getsize(log_file_path) / (1024 * 1024)  # Size in MB
#         if file_size > 200:
#             # If it exceeds, delete previous error logs
#             with open(log_file_path, 'w'):
#                 pass  # Clears the file

def check_error_log_size(log_file_path):
    # Check if the error log file exceeds 200 MB
    if os.path.exists(log_file_path):
        file_size = os.path.getsize(log_file_path) / (1024 * 1024)  # Size in MB
        if file_size > 100:
            # If it exceeds, retain the last 200 MB of the log
            with open(log_file_path, 'rb+') as file:
                file.seek(-100 * 1024 * 1024, os.SEEK_END)  # Move the pointer to 200 MB before the end
                last_200_mb = file.read()  # Read the last 200 MB of the log
                file.seek(0)  # Move the pointer to the beginning
                file.truncate()  # Truncate the file
                file.write(last_200_mb)  # Write back the last 200 MB

info_logger = setup_info_logger(info_log_file_path)
error_logger = setup_error_logger(error_log_file_path)
check_error_log_size(error_log_file_path)
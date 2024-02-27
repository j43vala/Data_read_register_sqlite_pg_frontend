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

def setup_info_logger(log_file_path):
    if not os.path.isfile(log_file_path):
        with open(log_file_path, 'w'):
            pass  # Creates an empty file

    info_logger = logging.getLogger('info_logger')
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
    error_logger.addHandler(error_handler)
    return error_logger

info_logger = setup_info_logger(info_log_file_path)
error_logger = setup_error_logger(error_log_file_path)
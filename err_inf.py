import os

info_log_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "info.log")


# info function to retrive logs 
def handle_info_command(info_keyword_to_search, num_occurrences=5):
    try:
        with open(info_log_file_path, 'r') as f:
            lines = f.readlines()
            keyword_lines = [line for line in lines if info_keyword_to_search in line]

            if not keyword_lines:
                print(f"No occurrences of '{info_keyword_to_search}' found in the info log.")
            else:
                # Get the last 'num_occurrences' lines containing the keyword
                keyword_lines = keyword_lines[-num_occurrences:]
                
                # Extract the content between the last occurrences
                start_index = lines.index(keyword_lines[0])
                end_index = lines.index(keyword_lines[-1]) + 1
                content_between = lines[start_index:end_index]
                
                # Send the content between occurrences to the MQTT topic or print it, depending on your requirements
                content_str = ''.join(content_between)
                print(f"Content between the last occurrences of '{info_keyword_to_search}' in the info log:\n{content_str}")
    except Exception as e:
        print(f"Error handling info command: {e}")

info_keyword_to_search = "INFO"
# handle_info_command(info_keyword_to_search)



# error function to retrive logs 
error_log_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "error.log")



def handle_error_command(error_keyword_to_search, num_occurrences=5):
    try:
        with open(error_log_file_path, 'r') as f:
            lines = f.readlines()
            keyword_lines = [line for line in lines if error_keyword_to_search in line]

            if not keyword_lines:
                print(f"No occurrences of '{error_keyword_to_search}' found in the error log.")
            else:
                # Get the last 'num_occurrences' lines containing the keyword
                keyword_lines = keyword_lines[-num_occurrences:]
                
                # Extract the content between the last occurrences
                start_index = lines.index(keyword_lines[0])
                end_index = lines.index(keyword_lines[-1]) + 1
                content_between = lines[start_index:end_index]
                
                # Send the content between occurrences to the MQTT topic or print it, depending on your requirements
                content_str = ''.join(content_between)
                print(f"Content between the last occurrences of '{error_keyword_to_search}' in the error log:\n{content_str}")
    except Exception as e:
        print(f"Error handling info command: {e}")

error_keyword_to_search = "ERROR"
handle_error_command(error_keyword_to_search)



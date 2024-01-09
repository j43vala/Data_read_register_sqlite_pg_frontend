import statistics

class Aggregate():
    def aggregate_data(self,type:str,data:list):
        '''

        type > min, max, avg, median, rms, mode 

        '''
        if not data:
            return None  # Handle empty list
        if type == "min":
            print("executing min")
            return self.calculate_minimum(data)
        elif type=="max":
            return self.calculate_maximum(data)
        elif type =="avg":
            return self.calculate_average(data)
        elif type=="median":
            return self.calculate_median(data)
        elif type=="rms":
            return self.calculate_root_mean_square(data)
        elif type=="mode":
            return self.calculate_mode(data)
       
        else:                # if type is unknown ....
            print(type, "unknown type")
            return None 
        
    def calculate_minimum(self, data:list):
        try:
            result=min(data)   # returns the smallest item in an iterable or the smallest
            return result
        except:
            raise ValueError("Data must be a non-empty list of numbers")
            
    def calculate_maximum(self, data: list):
        try:
            result = max(data)  # returns the largest item in an iterable or the largest
            return result
        except ValueError:
            raise ValueError("Data must be a non-empty list of numbers")
        
    def calculate_average(self, data: list):
        try:
            result = sum(data) / len(data)  # calculates the average of the list
            return result
        except ZeroDivisionError:
            raise ValueError("Data must be a non-empty list of numbers")
        
    
    def calculate_median(self, data: list):
        try:
            return statistics.median(data)
        except statistics.StatisticsError as e:
            raise ValueError(f"Error calculating mode: {e}")

    def calculate_mode(self, data: list):
        try:
            return statistics.mode(data)
        except statistics.StatisticsError as e:
            raise ValueError(f"Error calculating mode: {e}")
        
    def calculate_root_mean_square(self, data: list):
            try:
                return (sum(x ** 2 for x in data) / len(data)) ** 0.5
            except ZeroDivisionError:
                return None

if __name__ == "__main__":
    # Example usage:
    data = [1, 1, 9 , 10 ,2, 3, 4, 5, 6, 7, 8]
    
    a = Aggregate()
    minimum_value = a.aggregate_data("min",data)
    maximum_value = a.aggregate_data("max",data)
    average_value = a.aggregate_data("avg",data)
    median_value = a.aggregate_data("median",data)
    mode_value = a.aggregate_data("mode",data)
    rms_value = a.aggregate_data("rms",data)


    # minimum_value = calculate_minimum(data)
    # maximum_value = calculate_maximum(data)
    # average_value = calculate_average(data)
    # median_value = calculate_median(data)
    # mode_value = calculate_mode(data)
    # rms_value = calculate_root_mean_square(data)

    print("Minimum:", minimum_value)
    print("Maximum:", maximum_value)
    print("Average:", average_value)
    print("Median:", median_value)
    print("Mode:", mode_value)
    print("Root Mean Square:", rms_value)

import cv2
import base64
import numpy as np
import sys

def compare_images(encoded_image_data):
    try:
        decoded_data = base64.b64decode(encoded_image_data).decode('utf-8')
      

        # Open the image file
        with open(decoded_data, 'rb') as image_file:
            # Read the image file
            img_data = image_file.read()
            
        # Convert the image data to a NumPy array
        nparr = np.frombuffer(img_data, np.uint8)

        # Decode the NumPy array as an image
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Display the image
        cv2.imshow('Decoded Image', img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

        # Capture a real-time image
        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()
        cap.release()
   
        # Convert the real-time captured image to grayscale
        gray2 = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Initiate SIFT detector
        sift = cv2.SIFT_create()
       

        # find the keypoints and descriptors with SIFT
        kp1, des1 = sift.detectAndCompute(img, None)
        kp2, des2 = sift.detectAndCompute(gray2, None)

        
        # BFMatcher with default params
        bf = cv2.BFMatcher()
        matches = bf.knnMatch(des1, des2, k=2)

        

        # Apply ratio test
        good_matches = []
        for m, n in matches:
            if m.distance < 0.75 * n.distance:
                good_matches.append([m])

        

        similarity_score = len(good_matches)
        print(similarity_score)
        
    except Exception as e:
        print(f"Error processing image: {e}", file=sys.stderr)
        return -1

if __name__ == '__main__':

    # Read the base64 encoded image data from command line argument
    encoded_string = sys.argv[1]
   

    similarity_score = compare_images(encoded_string)
  

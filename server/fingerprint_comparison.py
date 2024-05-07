import cv2
import numpy as np
import base64
import sys

def base64_to_image(base64_string):
    decoded_data = base64.b64decode(base64_string).decode('utf-8')
    # Open the image file
    with open(decoded_data, 'rb') as image_file:
            # Read the image file
        img_data = image_file.read()
    np_data = np.frombuffer(img_data, np.uint8)
    image = cv2.imdecode(np_data, cv2.IMREAD_COLOR)
    cv2.imshow('Decoded Image', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return image

def match_images(base64_image_1, base64_image_2):
    image_1 = base64_to_image(base64_image_1)
    image_2 = base64_to_image(base64_image_2)

    sift = cv2.SIFT_create()

    keypoints_1, descriptors_1 = sift.detectAndCompute(image_1, None)
    keypoints_2, descriptors_2 = sift.detectAndCompute(image_2, None)

    if descriptors_1 is None or descriptors_2 is None:
        print("Error: Failed to extract descriptors.")
        return None

    matcher = cv2.BFMatcher()
    matches = matcher.knnMatch(descriptors_1, descriptors_2, k=2)

    match_points = []
    for p, q in matches:
        if p.distance < 0.95 * q.distance:
            match_points.append(p)

    keypoints = min(len(keypoints_1), len(keypoints_2))
    match_score = len(match_points) / keypoints * 100
    print(match_score)

if __name__ == "__main__":
    base64_image_1 = sys.argv[1]  # Base64-encoded image 1
    base64_image_2 = sys.argv[2] # Base64-encoded image 2
    match_score = match_images(base64_image_1, base64_image_2)

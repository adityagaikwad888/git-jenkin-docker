pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = "adityagaikwad888/node-app"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        SERVER_IP = '3.110.222.51' // Your actual EC2 IP
        SSH_USER = 'ubuntu' // Or ec2-user depending on your AMI
        // SSH_KEY = credentials('amd_practice_ec2_key')
        SSH_KEY = "/c/Users/adity/Downloads/AMD.pem"
    }
    
    stages {
        stage ("Check Out") {
            steps {
                git branch: 'main', url: 'https://github.com/adityagaikwad888/git-jenkin-docker.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }
        stage('Run Test') {
            steps {
                echo 'Testing Phase...'
                bat 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    bat "docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%"
                    bat "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    bat "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    bat "ssh -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -o UserKnownHostsFile=/dev/null -i ${SSH_KEY} ubuntu@${SERVER_IP} 'sudo bash /home/ubuntu/deploy.sh'"
                }
            }
        }

        stage('Docker Prune') {
            steps {
                echo 'Cleaning unused Docker resources...'
                bat 'docker system prune -f'
            }
        }
    }
    
    
    post {
        always {
            // Remove the need for a nested node block by moving commands directly to post
            bat 'docker logout'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
    
}

#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import smtplib
import sys
import time
import datetime
from email.mime.text import MIMEText
from email.header import Header



def sendmail(subject,content):

	# 第三方 SMTP 服务
	mail_host="smtp.139.com"  #设置服务器
	mail_user="13548180218"	   #用户名
	mail_pass="Pass2word139"   #口令 
	sender = '13548180218@139.com'
	
	
	
	#mail_host="smtp.163.com"  #设置服务器
	#mail_user="xhu218"	   #用户名
	#mail_pass="Pass2word163"   #口令 
	#sender = 'xhu218@163.com'
	
	
	#receivers = ['13548180218@139.com','xhu218@163.com','xhu218@hotmail.com','xhu218@sina.com','wangfugui@sobey.com']	 # 接收邮件，可设置为你的QQ邮箱或者其他邮箱
	receivers = ['13548180218@139.com']	 # 接收邮件，可设置为你的QQ邮箱或者其他邮箱
	



	message = MIMEText(content, 'plain', 'utf-8')
	message['From'] = Header("abc", 'utf-8')
	message['To'] =	 Header("123", 'utf-8')
	
	
	message['Subject'] = Header(subject, 'utf-8')
	
	
	try:
		smtpObj = smtplib.SMTP() 
		smtpObj.connect(mail_host, 25)	  # 25 为 SMTP 端口号
		smtpObj.login(mail_user,mail_pass)	
		smtpObj.sendmail(sender, receivers, message.as_string())
		#print "邮件发送成功"
	except smtplib.SMTPException ,e:
		print "Error: 无法发送邮件" ,e


def sendemailprocess(subject,path):

	if os.path.exists(path):
		print "s"		
		f = open(path)
		contents = f.read()
		print(contents)
		sendmaillocal(subject,contents);
		f.close()

		
def sendmaillocal(subject,content):
	
	sender = 'wangfugui@hotmail.com'
	#receivers = ['67438964@qq.com']  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱
	receivers = ['13548180218@139.com','xhu218@163.com','xhu218@hotmail.com','xhu218@sina.com','wangfugui@sobey.com']	 # 接收邮件，可设置为你的QQ邮箱或者其他邮箱
	 
	mail_msg = content
	message = MIMEText(mail_msg, 'plain', 'utf-8')
	message['From'] = Header("王富贵", 'utf-8')
	message['To'] =  Header("开发测试环境性能", 'utf-8')
	 
	#subject = '开发测试环境性能'
	message['Subject'] = Header(subject, 'utf-8')
	 
	 
	try:
		smtpObj = smtplib.SMTP('localhost')
		smtpObj.sendmail(sender, receivers, message.as_string())
		print "邮件发送成功"
	except smtplib.SMTPException:
		print "Error: 无法发送邮件"






if __name__ == '__main__':

	#print "脚本名：", sys.argv[0]
	#for i in range(1, len(sys.argv)):
	#	print "参数", i, sys.argv[i]
	#
	#sendmail(sys.argv[1],sys.argv[2])
	sendemailprocess(sys.argv[1],sys.argv[2])
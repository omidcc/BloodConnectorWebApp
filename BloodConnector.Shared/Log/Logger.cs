﻿using System;
using System.IO;
using System.Text;

namespace BloodConnector.Shared.Log
{
    public class Logger
    {
        private readonly string _logDir;
        private readonly string _logFile = "Exception_{0}_{1}_{2}.txt";
        private readonly string _logFilePath;

        public Logger(string logDir)
        {
            _logDir = logDir;

            if (!Directory.Exists(_logDir))
                Directory.CreateDirectory(_logDir);

            _logFilePath = string.Format(Path.Combine(_logDir, _logFile), DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
        }

        private void LogWrite(string message)
        {
            using (var fs = new FileStream(_logFilePath, FileMode.Append))
            {
                byte[] buffer = Encoding.UTF8.GetBytes(message);
                fs.Write(buffer, 0, buffer.Length);
            }
        }

        public void Log(string message)
        {
            var sb = new StringBuilder();
            sb.Append("===========Start===============");
            sb.AppendLine();
            sb.Append(message);
            sb.AppendLine();
            sb.Append("============End==============");
            sb.AppendLine();
            sb.AppendLine();
            this.LogWrite(sb.ToString());
        }

        public void Log(Exception ex)
        {

            var sb = new StringBuilder();
            sb.AppendFormat("===============Exception Occuurred at {0}===================", DateTime.Now.ToShortTimeString());
            sb.AppendLine();
            sb.AppendLine();

            sb.Append("Message");
            sb.AppendLine();
            sb.AppendLine("-----------");
            sb.AppendLine();
            sb.Append(ex.Message);

            sb.AppendLine();
            sb.AppendLine();


            sb.Append("StackTrace");
            sb.AppendLine();
            sb.AppendLine("-----------");
            sb.AppendLine();
            sb.Append(ex.StackTrace);
            sb.AppendLine();
            sb.AppendLine();

            sb.Append("===============End===================");

            this.LogWrite(sb.ToString());
        }
    }
}
